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
