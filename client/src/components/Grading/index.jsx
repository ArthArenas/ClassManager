import React from 'react';
import { Button, ButtonGroup, Table, InputGroup, Input } from 'reactstrap';
import uuid from 'uuid';

import { calculateGradeAsPercent, calculateGradeContribution } from '../../local_framework/math.js';
import { calculateGPA, identity, createUncontrolledCell } from '../../local_framework/cm_util.js';

import Course from '../../models/Course.js';
import CourseStudent from '../../models/CourseStudent.js';

class TermGradingTable extends React.Component {

    createRow = (work, idx, f) => {

        var data = {
            finalExam: f(work.finalExamUnits, this.props.workload.finalExamUnits, this.props.configuration.finalExamWeight),
            homework: f(work.homeworkUnits, this.props.workload.homeworkUnits, this.props.configuration.homeworkWeight),
            classwork: f(work.classworkUnits, this.props.workload.classworkUnits, this.props.configuration.classworkWeight),
            attendance: f(work.attendance, this.props.workload.attendance, this.props.configuration.attendanceWeight),
            behavior: f(work.behavior, this.props.workload.behavior, this.props.configuration.behaviorWeight),
            extra: f(work.extra, this.props.workload.extra, this.props.configuration.extraWeight)
        }
        var className = this.props.displayMode === 1 ? "field" : "";

        return (
            <tr key={uuid()}>
                <th scope="row">{idx + 1}</th>
                <td style={{ textAlign: "start" }}>{this.props.workUnits[idx].givenNames + ' ' + this.props.workUnits[idx].surname}</td>
                <td>{createUncontrolledCell(data.finalExam, (this.props.isEditing && !this.props.hasExam), this.props.displayMode, className)}</td>
                <td>{createUncontrolledCell(data.homework, this.props.isEditing, this.props.displayMode, className)}</td>
                <td>{createUncontrolledCell(data.classwork, this.props.isEditing, this.props.displayMode, className)}</td>
                <td>{createUncontrolledCell(data.attendance, this.props.isEditing, this.props.displayMode, className)}</td>
                <td>{createUncontrolledCell(data.behavior, this.props.isEditing, this.props.displayMode, className)}</td>
                <td>{createUncontrolledCell(data.extra, this.props.isEditing, this.props.displayMode, className)}</td>
                <td>{createUncontrolledCell(calculateGPA(work, this.props.workload, this.props.configuration, this.props.configuration.finalExamWeight), 
                    false, 1, className)}</td>
            </tr>
        );
    }

    render() {

        var f = function() {};
        if(this.props.displayMode === 0) f = calculateGradeContribution;
        else if(this.props.displayMode === 1) f = identity;
        else f = calculateGradeAsPercent;

        const studentsListPreCalc = this.props.workUnits.map((work, idx) => {
            return this.createRow(work, idx, f);
        });

        var data = {
            finalExam: f(this.props.workload.finalExamUnits, this.props.workload.finalExamUnits, this.props.configuration.finalExamWeight),
            homework: f(this.props.workload.homeworkUnits, this.props.workload.homeworkUnits, this.props.configuration.homeworkWeight),
            classwork: f(this.props.workload.classworkUnits, this.props.workload.classworkUnits, this.props.configuration.classworkWeight),
            attendance: f(this.props.workload.attendance, this.props.workload.attendance, this.props.configuration.attendanceWeight),
            behavior: f(this.props.workload.behavior, this.props.workload.behavior, this.props.configuration.behaviorWeight),
            extra: f(this.props.workload.extra, this.props.workload.extra, this.props.configuration.extraWeight)
        }

        var inputsForMaxUnits = {
            finalExam: createUncontrolledCell(data.finalExam, (this.props.isEditing && !this.props.hasExam && (this.props.displayMode === 1)), this.props.displayMode, "fieldMax"),
            homework: createUncontrolledCell(data.homework, this.props.isEditing, this.props.displayMode, "fieldMax"),
            classwork: createUncontrolledCell(data.classwork, this.props.isEditing, this.props.displayMode, "fieldMax"),
            attendance: createUncontrolledCell(data.attendance, this.props.isEditing, this.props.displayMode, "fieldMax"),
            behavior: createUncontrolledCell(data.behavior, this.props.isEditing, this.props.displayMode, "fieldMax"),
            extra: createUncontrolledCell(data.extra, this.props.isEditing, this.props.displayMode, "fieldMax")
        };

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
                <tr>
                    <th style={{ width: "9%", verticalAlign: "middle"}} >#</th>
                    <th style={{verticalAlign: "middle"}}>Nombre</th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Examen Final</text><br/>
                        <text>Total: </text>{inputsForMaxUnits.finalExam}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Tareas</text><br/>
                        <text>Total: </text>{inputsForMaxUnits.homework}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Trabajos</text><br/>
                        <text>Total: </text>{inputsForMaxUnits.classwork}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Puntualidad</text><br/>
                        <text>Total: </text>{inputsForMaxUnits.attendance}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Conducta</text><br/>
                        <text>Total: </text>{inputsForMaxUnits.behavior}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Puntos Extra</text><br/>
                        <text>Total: </text>{inputsForMaxUnits.extra}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Promedio Acumulado</text><br/>
                        <text>Total: 10.0</text>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {studentsListPreCalc}
                </tbody>
            </Table>
        )
    }
}

class Grading extends React.Component {
    
    constructor(props) {
        super(props);
        this.state =  {
            editMode: false,
            selectedTab: 1,
            configuration: {
                finalExamWeight: 0.5,
                homeworkWeight: 0.2,
                classworkWeight: 0.2,
                attendanceWeight: 0.05,
                behaviorWeight: 0.05,
                extraWeight: 0.05
            },
            workload: {
                finalExamUnits: 1,
                homeworkUnits: 1,
                classworkUnits: 1,
                attendance: 1,
                behavior: 1,
                extra: 1
            },
            course: new Course(null, null, null, false),
            workUnits: []
        };
    }

    toggleSwitch = () => {
        this.setState((prevState) => {
            return {
                editMode: !prevState.editMode,
                selectedTab: 1
            }
        });
    }

    __DEBUG__fetchFromFile = (filePath, statePropName) => {
        fetch(filePath)
        .then((res) => {
            res.json().then( (val) => {
                this.setState({
                    [statePropName]: val.data
                })
            })
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.__DEBUG__fetchFromFile('./configuration.json', 'configuration');
        this.__DEBUG__fetchFromFile('./workload.json', 'workload');
        this.__DEBUG__fetchFromFile('./workUnits.json', 'workUnits');
    }

    handleTabChange = (tabIdx) => {
        if(this.state.selectedTab !== tabIdx){
            this.setState({
                selectedTab: tabIdx
            })
        }
    }

    readInputs = (selector) => {
        const list = document.querySelectorAll(selector);
        const inputData = [];
        for(const node of list){
            inputData.push(node.value)
        }
        return inputData;
    }

    handleSave = () => {
        if(!this.state.editMode) return;

        var inputData = this.readInputs("tr .field");
        var maxInputData = this.readInputs("tr .fieldMax");
        
        var newWorkUnits = [];
        var newWorkload = {};
        var columns = this.state.course.hasExam ? 5 : 6;
        var rows = inputData.length / columns;
        var offset = this.state.course.hasExam ? 0 : 1;
    
        var finalExamUnits;

        for(var i = 0; i < rows; i++){
            finalExamUnits = this.state.course.hasExam ? this.state.workUnits[i].finalExamUnits : parseInt(inputData[i * columns]);

            newWorkUnits.push({
                _id: this.state.workUnits[i]._id,
                givenNames: this.state.workUnits[i].givenNames,
                surname: this.state.workUnits[i].surname,
                finalExamUnits: finalExamUnits,
                homeworkUnits: parseInt(inputData[i * columns + offset + 0]),
                classworkUnits: parseInt(inputData[i * columns + offset + 1]),
                attendance: parseInt(inputData[i * columns + offset + 2]),
                behavior: parseInt(inputData[i * columns + offset + 3]),
                extra: parseInt(inputData[i * columns + offset + 4])
            });
        }

        finalExamUnits = this.state.course.hasExam ? this.state.workUnits[i].finalExamUnits : parseInt(maxInputData[0]);

        newWorkload = {
            finalExamUnits: finalExamUnits,
            homeworkUnits: parseInt(maxInputData[0 + offset]),
            classworkUnits: parseInt(maxInputData[1 + offset]),
            attendance: parseInt(maxInputData[2 + offset]),
            behavior: parseInt(maxInputData[3 + offset]),
            extra: parseInt(maxInputData[4 + offset])
        };

        console.log(newWorkload);
        console.log(newWorkUnits);

        this.setState({
            workUnits: newWorkUnits,
            workload: newWorkload
        });
    }

    render() {
        var editModeStr = this.state.editMode ? "ON" : "OFF"
        var editModeButtonColor = this.state.editMode ? "info" : "secondary"

        var tabColors = ["secondary", "secondary", "secondary"];
        tabColors[this.state.selectedTab] = "info"

        return (
            <div style={{margin: "60px", maxWidth: "1536px"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{flex: 1}} />
                    <h1 style={{flex: 3, textAlign: "center"}} >Evaluación del Trimestre</h1>
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
                    <div style={{
                            flex: 1
                        }}>
                        <ButtonGroup style={{flex: 1}}>
                            <Button disabled={this.state.editMode} color={tabColors[0]} onClick={(e) => { this.handleTabChange(0) }} >Puntos finales</Button>
                            <Button disabled={this.state.editMode} color={tabColors[1]} onClick={(e) => { this.handleTabChange(1) }} >Unidades de trabajo</Button>
                            <Button disabled={this.state.editMode} color={tabColors[2]} onClick={(e) => { this.handleTabChange(2) }} >Porcentajes</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <br/>
                <div>
                    <TermGradingTable
                        isEditing={this.state.editMode}
                        displayMode={this.state.selectedTab}
                        hasExam={this.state.course.hasExam}
                        configuration={this.state.configuration}
                        workload={this.state.course.workload}
                        workUnits={this.state.workUnits}
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

export default Grading;