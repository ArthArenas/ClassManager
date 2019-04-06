import React from 'react';
//import { Link as _Link } from 'react-router-dom';

import { Button, InputGroup, InputGroupAddon, Input, ListGroup, ListGroupItem, Table } from 'reactstrap';
import uuid from 'uuid';

class StudentRoster extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newStudentGivenNames: '',
            newStudentSurname: '',
            newStudentGender: 'Masculino'
        }
    }

    handleUpdateOfNewSubject = (studentProp, e) => {
        this.setState({
            [studentProp]: e.target.value
        })
    }

    handleAdditionOfElement = (curState, event) => {
        var newElement = {
            _id: this.props.studentsJSON.length + 1,
            givenNames: curState.newStudentGivenNames,
            surname: curState.newStudentSurname,
            gender: curState.newStudentGender
        }
        this.props.handleAdditionOfElement('studentsJSON', newElement)
        this.setState({
            newStudentGivenNames: '',
            newStudentSurname: '',
            newStudentGender: 'Masculino'
        });
    }

    handleDeletionOfElement = (row, event) => {
        this.props.handleDeletionOfElement('studentsJSON', row);
    }

    handleUpdateOfField = (idx, name, event) => {
        //event.preventDefault();
        this.props.handleUpdateOfField('studentsJSON', idx, name, event.target.value);
    }

    render() {
        const studentsListPreCalc = this.props.studentsJSON.map((studentData, idx) => {
            if(!this.props.isEditing){
                return (
                    <tr>
                        <th scope="row">{idx + 1}</th>
                        <td>{studentData.givenNames}</td>
                        <td>{studentData.surname}</td>
                        <td>{studentData.gender}</td>
                    </tr>
                );
            }
            else{
                return (
                    <tr id={idx + 1}>
                        <th scope="row">
                            <Button style={{margin: "0px 20px 0px 0px"}} className="flex-fill" color="danger" size="sm" onClick={ (e) => { this.handleDeletionOfElement(idx, e) } }>Eliminar</Button>
                            {idx}
                        </th>
                        <td><Input value={studentData.givenNames} onChange={(e) => { this.handleUpdateOfField(idx, 'givenNames', e) }} /></td>
                        <td><Input value={studentData.surname} onChange={(e) => { this.handleUpdateOfField(idx, 'surname', e) }} /></td>
                        <td>
                            <Input type="select" value={studentData.gender} onChange={(e) => { this.handleUpdateOfField(idx, 'gender', e) }} >
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </Input>
                        </td>
                    </tr>
                );
            }
        });

        const additionRow = (
            <tr>
                <th scope="row">
                    <Button color="success" size="sm" onClick={(e) => { this.handleAdditionOfElement(this.state, e) }}>Agregar</Button>
                </th>
                <td><Input value={this.state.newStudentGivenNames} onChange={(e) => { this.handleUpdateOfNewSubject('newStudentGivenNames', e) }} /></td>
                <td><Input value={this.state.newStudentSurname} onChange={(e) => { this.handleUpdateOfNewSubject('newStudentSurname', e) }} /></td>
                <td>
                    <Input value={this.state.newStudentGender} type="select" onChange={(e) => { this.handleUpdateOfNewSubject('newStudentGender', e) }} >
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </Input>
                </td>
            </tr>
        );

        return (
            <Table striped={!this.props.isEditing} bordered={this.props.isEditing}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Género</th>
                </tr>
                </thead>
                <tbody>
                    {studentsListPreCalc}
                    {this.props.isEditing && additionRow}
                </tbody>
            </Table>
        )
    }
}

class SubjectList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newSubjectTitle: ''
        }
    }

    handleUpdateOfField = (idx, name, event) => {
        //event.preventDefault();
        this.props.handleUpdateOfField('subjectsJSON', idx, name, event.target.value);
    }

    handleUpdateOfNewSubject = (e) => {
        this.setState({
            newSubjectTitle: e.target.value
        })
    }

    handleAdditionOfElement = (curTitle, event) => {
        var newElement = {
            _id: uuid(),
            title: curTitle
        }
        this.props.handleAdditionOfElement('subjectsJSON', newElement)
        this.setState({
            newSubjectTitle: ''
        });
    }

    handleDeletionOfElement = (row, event) => {
        this.props.handleDeletionOfElement('subjectsJSON', row)
    }

    render() {
        const subjectsListPreCalc = this.props.subjectsJSON.map((subjectData, idx) => {
            if(!this.props.isEditing){
                return (<ListGroupItem>{subjectData.title}</ListGroupItem>);
            }
            else{
                return (
                    <ListGroupItem className="d-flex" id={idx}>
                        <Button style={{margin: "0px 20px 0px 0px"}} className="flex-fill" color="danger" size="sm" onClick={(e) => { this.handleDeletionOfElement(idx, e) }}>Eliminar</Button>
                        <Input value={subjectData.title} className="flex-fill" onChange={(e) => { this.handleUpdateOfField(idx, 'title', e) }} />
                    </ListGroupItem>  
                );
            }
        });

        const additionRow = (
            <ListGroupItem className="d-flex">
                <Button style={{margin: "0px 20px 0px 0px"}} className="flex-fill" color="success" size="sm" onClick={(e) => { this.handleAdditionOfElement(this.state.newSubjectTitle, e) }}>Agregar</Button>
                <Input className="flex-fill" value={this.state.newSubjectTitle} onChange={this.handleUpdateOfNewSubject} />
            </ListGroupItem>
        );

        return (
            <ListGroup>
                {subjectsListPreCalc}
                {this.props.isEditing && additionRow}
            </ListGroup>
        );
    }
}

class TermsConfiguration extends React.Component {

    //constructor(props){
    //    super(props);
    //}

    handleUpdateOfField = (name, event) => {
        //event.preventDefault();
        this.props.handleUpdateOfField('configJSON', null, name, event.target.value);
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Cantidad de periodos de evaluación por ciclo escolar: </InputGroupAddon>
                    <Input disabled={!this.props.isEditing} type="number" step="1" value={this.props.configJSON.termsCnt} onChange={(e) => { this.handleUpdateOfField('termsCnt', e) }} />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Cantidad de parciales por periodo de evaluación: </InputGroupAddon>
                    <Input disabled={!this.props.isEditing} type="number" step="1" value={this.props.configJSON.partialsCnt} onChange={(e) => { this.handleUpdateOfField('partialsCnt', e) }} />
                </InputGroup>
            </div>
        );
    }
}

class Elements extends React.Component {
    
    constructor(props) {
        super(props);
        this.state =  {
            editMode: false,
            studentsJSON: [],
            subjectsJSON: [],
            configJSON: {
                termsCnt: 0,
                partialsCnt: 0
            }
        };
    }

    componentDidMount(){
        fetch('./students.json')
        .then((res) => {
            res.json().then( (val) => {
                this.setState({
                    studentsJSON: val.data
                })
            })
        })
        .catch(err => console.log(err));

        fetch('./subjects.json')
        .then((res) => {
            res.json().then( (val) => {
                this.setState({
                    subjectsJSON: val.data
                })
            })
        })
        .catch(err => console.log(err));

        fetch('./config.json')
        .then((res) => {
            res.json().then( (val) => {
                this.setState({
                    configJSON: val.data
                })
            })
        })
        .catch(err => console.log(err));
    }

    handleAdditionOfElement = (targetState, newElement) => {
        if(targetState === 'studentsJSON'){
            this.setState((prevState) => {
                return {
                    studentsJSON: [...prevState.studentsJSON, newElement]
                }
            });
        }
        else if(targetState === 'subjectsJSON'){
            this.setState((prevState) => {
                return {
                    subjectsJSON: [...prevState.subjectsJSON, newElement]
                }
            });
        }
    }

    handleDeletionOfElement = (targetState, row) => {
        if(targetState === 'studentsJSON'){
            this.setState((prevState) => ({
                studentsJSON: this.state.studentsJSON.filter((_, idx) => idx !== row)
            }));
        }
        else if(targetState === 'subjectsJSON'){
            this.setState((prevState) => ({
                subjectsJSON: this.state.subjectsJSON.filter((_, idx) => idx !== row)
            }));
        }
    }

    handleUpdateOfField = (targetState, idx, name, value) => {
        if(targetState === 'configJSON'){
            this.setState((prevState) => ({
                configJSON: {
                    ...prevState.configJSON,
                    [name]: value
                }
            }));
        }
        else if(targetState === 'studentsJSON'){
            this.setState((prevState) => ({
                ...prevState,
                studentsJSON: prevState.studentsJSON.map((student, _idx) => {
                    return (idx === _idx) ? {
                        ...student,
                        [name]: value
                    } : student
                })
            }));
        }
        else if(targetState === 'subjectsJSON'){
            this.setState((prevState) => ({
                ...prevState,
                subjectsJSON: prevState.subjectsJSON.map((subject, _idx) => {
                    return (idx === _idx) ? {
                        ...subject,
                        [name]: value
                    } : subject
                })
            }));
        }
        else{
            console.log("I'm not sure what's going on now");
        }
    }

    toggleSwitch = () => {
        this.setState((prevState) => {
            return {
                editMode: !prevState.editMode
            }
        });
    }

    render() {
        var editModeStr = this.state.editMode ? "ON" : "OFF"
        var editModeButtonColor = this.state.editMode ? "info" : "secondary"

        return (
            <div style={{margin: "60px", maxWidth: "1024px"}}>
                <div class="d-flex justify-content-between align-items-center">
                    <div style={{flex: 1}} />
                    <h1 style={{flex: 3, textAlign: "center"}} >Elementos de Evaluación</h1>
                    <div style={{flex: 1}}>
                        <Button size="lg" color="primary">Home</Button>
                    </div>
                </div>
                <div style={{verticalAlign: true}}>
                    <Button onClick={this.toggleSwitch} color={editModeButtonColor}>Modo Editar: {editModeStr}</Button>
                </div>
                <div>
                    <h2 style = {{margin: "1em"}}>Lista de Alumnos</h2>
                    <StudentRoster isEditing={this.state.editMode}
                        studentsJSON={this.state.studentsJSON}
                        handleUpdateOfField={this.handleUpdateOfField}
                        handleAdditionOfElement={this.handleAdditionOfElement}
                        handleDeletionOfElement={this.handleDeletionOfElement} />
                </div>
                <div>
                    <h2 style = {{margin: "1em"}}>Lista de Materias</h2>
                    <SubjectList isEditing={this.state.editMode} 
                        subjectsJSON={this.state.subjectsJSON}
                        handleUpdateOfField={this.handleUpdateOfField}
                        handleAdditionOfElement={this.handleAdditionOfElement}
                        handleDeletionOfElement={this.handleDeletionOfElement} />
                </div>
                <div>
                    <h2 style = {{margin: "1em"}}>Número de Periodos</h2>
                    <TermsConfiguration isEditing={this.state.editMode} configJSON={this.state.configJSON} handleUpdateOfField={this.handleUpdateOfField} />
                </div>
                <div style={{margin: "40px", textAlign: "right", verticalAlign: true}}>
                    <Button style={{margin: "0px 10px"}} color="success" size="lg">Guardar</Button>
                    <Button style={{margin: "0px 10px"}} color="danger" size="lg">Descartar</Button>
                </div>
            </div>
        );
    }
}

export default Elements;