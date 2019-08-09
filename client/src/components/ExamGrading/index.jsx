import React from 'react';
import { Button, Table, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';

import { createUncontrolledCell } from '../../local_framework/cm_util.js';

class ExamGradingTable extends React.Component {

    createHeaderRow = (questions) => {
        var columnWidth = (72.0 / (questions + 1)).toFixed(3).toString() + "%";

        var row = [];
        for(var i = 0; i < questions; i++){
            row.push(
                <th key={uuid()} style={{ width: columnWidth, verticalAlign: "middle"}}>
                    P{i + 1}
                </th>
            );
        }

        return (
            <tr>
                <th style={{ width: columnWidth, verticalAlign: "middle"}} >#</th>
                <th style={{verticalAlign: "middle"}}>Nombre</th>
                {row}
            </tr>
        );
    }

    createRow = (student, idx) => {
        //var className = this.props.displayMode === 1 ? "field" : "";

        var row = student.grades.map((num) => {
            var iconColor;
            var iconType;
            if(num === 0){
                iconColor = "red";
                iconType = "times";
            }
            else if(num === 1){
                iconColor = "green";
                iconType = "check";
            }
            else if(num === null) {
                iconColor = "#D4AF37";
                iconType = "exclamation";
            }

            const cell = this.props.isEditing ? createUncontrolledCell(num, true, 1, "field") : <FontAwesomeIcon color={iconColor} icon={iconType} />;
            return (<td style={{padding: "0px 5px", verticalAlign: "middle" }} key={uuid()}>{cell}</td>);
        });

        return (
            <tr key={uuid()}>
                <th scope="row">{idx + 1}</th>
                <td style={{ textAlign: "start" }}>{student.givenNames + ' ' + student.surname}</td>
                {row}
            </tr>
        );
    }

    render() {

        var columns = 0;
        if(this.props.examGradesJSON.length > 0){
            columns = this.props.examGradesJSON[0].grades.length;
        }

        const header = this.createHeaderRow(columns);

        const tableContent = this.props.examGradesJSON.map((student, idx) => {
            return this.createRow(student, idx);
        });

        return (
            <Table
                style={{
                    textAlign: "center"
                }}
                striped={!this.props.isEditing}
                bordered
                hover={this.props.isEditing}
            >
                <thead >
                    {header}
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </Table>
        );
    }
}

class ExamGrading extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            examGradesJSON: [],
        };
    }

    toggleSwitch = () => {
        this.setState((prevState) => {
            return {
                editMode: !prevState.editMode,
            }
        });
    }

    __DEBUG__fetchFromFile = (filePath) => {
        fetch(filePath)
        .then((res) => {
            res.json().then( (val) => {
                this.setState({
                    examGradesJSON: val.data
                })
            })
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.__DEBUG__fetchFromFile('./examGrades.json');
    }

    handleSave = () => {
        if(!this.state.editMode) return;

        const list = document.querySelectorAll("tr .field");
        const inputData = [];
        for(const node of list){
            inputData.push((node.value === "0" || node.value === "1") ? parseInt(node.value) : null);
        }

        console.log(inputData);
        
        var newGrades = [];
        var columns = this.state.examGradesJSON[0].grades.length;
        var rows = inputData.length / columns;

        var i, j;
        for(i = 0; i < rows; i++){

            newGrades.push({
                _id: this.state.examGradesJSON[i]._id,
                givenNames: this.state.examGradesJSON[i].givenNames,
                surname: this.state.examGradesJSON[i].surname,
                grades: []
            });

            for(j = 0; j < columns; j++){
                newGrades[i].grades.push(inputData[i * columns + j]);
            }
        }

        this.setState({
            examGradesJSON: newGrades
        });

        console.log(this.state.examGradesJSON);
    }

    render() {
        var editModeStr = this.state.editMode ? "ON" : "OFF"
        var editModeButtonColor = this.state.editMode ? "info" : "secondary"

        return (
            <div style={{margin: "60px", maxWidth: "1536px"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{flex: 1}} />
                    <h1 style={{flex: 3, textAlign: "center"}} >Evaluación de Examen</h1>
                    <div style={{
                            flex: 1
                        }}>
                        <Button size="lg" color="primary" href="/">Home</Button>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{
                            verticalAlign: true, 
                            flex: 1
                        }}>
                        <Button onClick={this.toggleSwitch} color={editModeButtonColor}>Modo Editar: {editModeStr}</Button>
                    </div>
                    <div style={{
                            flexDirection: "column",
                            flex: 1,
                            textAlign: "center"
                        }}>
                        <h2>Primer Trimestre</h2>
                        <h2>Matemáticas</h2>
                    </div>
                    <div style={{ flex: 1 }} />
                </div>
                <br/>
                <div>
                    <ExamGradingTable
                        isEditing={this.state.editMode}
                        examGradesJSON={this.state.examGradesJSON}
                    />
                </div>
                <div style={{margin: "40px", textAlign: "right", verticalAlign: true}}>
                    <Button style={{margin: "0px 10px"}} color="success" size="lg" onClick={this.handleSave}>Guardar</Button>
                    <Button style={{margin: "0px 10px"}} color="danger" size="lg">Descartar</Button>
                </div>
            </div>
        );
    }

}

export default ExamGrading;