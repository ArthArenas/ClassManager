import { toFloat } from './math.js'
import React from 'react';
import { Input } from 'reactstrap';

export const identity = (arg) => {
    return arg;
}

export const calculateGPA = (workUnits, workload, weights) => {
    var gpa = 0.0;
    gpa += workUnits.finalExamUnits / workload.finalExamUnits * weights.finalExamWeight;
    gpa += workUnits.homeworkUnits / workload.homeworkUnits * weights.homeworkWeight;
    gpa += workUnits.classworkUnits / workload.classworkUnits * weights.classworkWeight;
    gpa += weights.attendanceWeight;
    gpa -= workUnits.attendance / workload.attendance * weights.attendanceWeight;
    gpa += weights.behaviorWeight;
    gpa -= workUnits.behavior / workload.behavior * weights.behaviorWeight;
    gpa += workUnits.extra / workload.extra * weights.extraWeight;
    return toFloat(gpa * 10, 1);
}

export const createUncontrolledCell = (data, isInput, displayMode, className) => {
    var cell;
    if(isInput){
        cell = <Input className={className} defaultValue={data} />
    }
    else{
        if(displayMode === 0){
            // Accumulated points
            cell = <text>{data}</text>
        }
        else if(displayMode === 1){
            // Work units
            cell = <text>{data}</text>
        }
        else{
            cell = <text>{data}%</text>
        }
    }
    return cell
}

/*
class TermGradingTable extends React.Component {

    createRow = (work, idx, f) => {

        var suffix = (this.props.displayMode === 2) ? '%' : '';
        var attArg = (this.props.displayMode === 2) ? this.props.workloadJSON.attendance - work.attendance : work.attendance;
        var attBeh = (this.props.displayMode === 2) ? this.props.workloadJSON.behavior - work.behavior : work.behavior;
        var preffix = (this.props.displayMode === 2) ? '' : '-';
        var data = {
            finalExam: f(work.finalExamUnits, this.props.workloadJSON.finalExamUnits, this.props.configurationJSON.finalExamWeight),
            homework: f(work.homeworkUnits, this.props.workloadJSON.homeworkUnits, this.props.configurationJSON.homeworkWeight),
            classwork: f(work.classworkUnits, this.props.workloadJSON.classworkUnits, this.props.configurationJSON.classworkWeight),
            attendance: f(attArg, this.props.workloadJSON.attendance, this.props.configurationJSON.attendanceWeight),
            behavior: f(attBeh, this.props.workloadJSON.behavior, this.props.configurationJSON.behaviorWeight),
            extra: f(work.extra, this.props.workloadJSON.extra, this.props.configurationJSON.extraWeight)
        }

        if(!this.props.isEditing){
            return (
                <tr key={uuid()}>
                    <th scope="row">{idx + 1}</th>
                    <td style={{ textAlign: "start" }}>{this.props.workUnitsJSON[idx].givenNames + ' ' + this.props.workUnitsJSON[idx].surname}</td>
                    <td>{data.finalExam}{suffix}</td>
                    <td>{data.homework}{suffix}</td>
                    <td>{data.classwork}{suffix}</td>
                    <td>{preffix}{data.attendance}{suffix}</td>
                    <td>{preffix}{data.behavior}{suffix}</td>
                    <td>{data.extra}{suffix}</td>
                    <td>{calculateGPA(work, this.props.workloadJSON, this.props.configurationJSON, this.props.configurationJSON.finalExamWeight)}</td>
                </tr>
            );
        }
        else{
            var finalExamCellComponent = this.props.hasExam ? <td>{data.finalExam}{suffix}</td> : <td><Input className="field" defaultValue={data.finalExam}/>{suffix}</td>;

            return (
                <tr key={uuid()}>
                    <th scope="row">{idx + 1}</th>
                    <td style={{ textAlign: "start" }}>{this.props.workUnitsJSON[idx].givenNames + ' ' + this.props.workUnitsJSON[idx].surname}</td>
                    {finalExamCellComponent}
                    <td><Input className="field" defaultValue={data.homework}/>{suffix}</td>
                    <td><Input className="field" defaultValue={data.classwork}/>{suffix}</td>
                    <td><Input className="field" defaultValue={data.attendance}/>{suffix}</td>
                    <td><Input className="field" defaultValue={data.behavior}/>{suffix}</td>
                    <td><Input className="field" defaultValue={data.extra}/>{suffix}</td>
                    <td>{calculateGPA(work, this.props.workloadJSON, this.props.configurationJSON, this.props.configurationJSON.finalExamWeight)}</td>
                </tr>
            );
        }
    }

    render() {
        var examHeaderComponent;
        if(this.props.hasExam){
            examHeaderComponent = <th style={{ width: "9%", verticalAlign: "middle"}}><Button color="link">Examen Final</Button></th>;
        }
        else{
            examHeaderComponent = <th style={{ width: "9%", verticalAlign: "middle"}}>Examen Final</th>;
        }

        const studentsListPreCalc = this.props.workUnitsJSON.map((work, idx) => {
            if(this.props.displayMode === 0){
                return this.createRow(work, idx, calculateGradeContribution);
            }
            else if(this.props.displayMode === 2){
                return this.createRow(work, idx, calculateGradeAsPercent);
            }
            else{
                return this.createRow(work, idx, identity);
            }
        });

        var editMaxUnits = (this.props.displayMode === 1 && this.props.isEditing && !this.props.hasExam);
        var inputsForMaxUnits = {};
        if(editMaxUnits){
            inputsForMaxUnits = {
                finalExam: <Input className="fieldMax" defaultValue={this.props.workloadJSON.finalExamUnits}/>,
                homework: <Input className="fieldMax" defaultValue={this.props.workloadJSON.homeworkUnits}/>,
                classwork: <Input className="fieldMax" defaultValue={this.props.workloadJSON.classworkUnits}/>,
                attendance: <Input className="fieldMax" defaultValue={this.props.workloadJSON.attendance}/>,
                behavior: <Input className="fieldMax" defaultValue={this.props.workloadJSON.behavior}/>,
                extra: <Input className="fieldMax" defaultValue={this.props.workloadJSON.extra}/>
            }
        }

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
                    {examHeaderComponent}
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Tareas</text><br/>
                        <text>Max: </text>{editMaxUnits ? inputsForMaxUnits.homework: <text>{this.props.workloadJSON.homeworkUnits}</text>}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Trabajos</text><br/>
                        <text>Max: </text>{editMaxUnits ? inputsForMaxUnits.classwork: <text>{this.props.workloadJSON.classworkUnits}</text>}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Puntualidad</text><br/>
                        <text>Max: </text>{editMaxUnits ? inputsForMaxUnits.attendance: <text>{this.props.workloadJSON.attendance}</text>}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Conducta</text><br/>
                        <text>Max: </text>{editMaxUnits ? inputsForMaxUnits.behavior: <text>{this.props.workloadJSON.behavior}</text>}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Puntos Extra</text><br/>
                        <text>Max: </text>{editMaxUnits ? inputsForMaxUnits.extra: <text>{this.props.workloadJSON.extra}</text>}
                    </th>
                    <th style={{ width: "9%", verticalAlign: "middle"}}>
                        <text>Promedio Acumulado</text><br/>
                        <text>Max: 10.0</text>
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

*/