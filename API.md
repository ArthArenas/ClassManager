## API
In this section you can find all the possible API calls that will return or modify data from/to MongoDB, they are grouped by HTTP request type.

### GET

**GET** ```/students```
```json
{
    "data": [
        {
            "_id": 1,
            "givenNames": "Harry James",
            "surnames": "Potter Evans",
            "gender": "M"
        },
        {},
        {}
    ]
}
```

**GET** ```/subjects```
```json
{
    "data": [
        {
            "_id": 1,
            "title": "Mathematics"
        },
        {},
        {}
    ]
}
```

**GET** ```/terms```
```json
{
    "data": [
        {
            "_id": 1,
            "title": "First Quarter",
            "number": 1
        },
        {},
        {}
    ]
}
```

**GET** ```/courses```: It's used in the navigation

```json
{
    "data": [
        {
            "term_title": "First Quarter",
            "subject_title": "Mathematics",
        },
        {},
        {}
    ]
}
```

**GET** ```/courses/<course_id>```
```json
{
    "term_title": "First Quarter",
    "subject_title": "Mathematics",
    "course_id": 1,
    "workload": {
        "finalExam": 5,
        "classwork": 5,
        "homework": 5,
        "attendance": 5,
        "behavior": 5,
        "extra": 5
    },
    "data": [
        {
            "course_students_id": 1,
            "student_givenNames": "Harry James",
            "student_surnames": "Potter Evans",
            "workUnits": {
                "finalExam": null, // if one is null, you see null
                "homework": 3,
                "classwork": 3,
                "attendance": 3,
                "behavior": 3,
                "extra": 3,
            },
            "grade": null
        },
        {},
        {}
    ]
}
```

**GET** ```/courses/<course_id>/exam```
```json
{
    "term_title": "First Quarter",
    "subject_title": "Mathematics",
    "data": [
        {
            "course_students_id": 1,
            "student_givenNames": "Harry James",
            "student_surnames": "Potter Evans",
            "finalExam": [1, null, 0]
        },
        {},
        {}
    ]
}
```

## PUT

```courses/<course_id>/exam/<student_id>```
Updates exam grades for a given student
```json
{
    "update": {
        "workUnits.finalExam": [1, 0, 1]
    }
}
```

```courses/<course_id>/```
Updates the workload of a course
```json
{
    "update": {
        "workload": {
            "finalExam": 4,
            "homework": 3,
            "classwork": 2,
            "attendance": 5,
            "behavior": 5,
            "extra": 5
        }
    }
}
```

```courses/<course_id>/<student_id>```
Updates the workUnits of a student in a course
```json
{
    "update": {
        "workUnits": {
            "finalExam": [1, 1, 1],
            "homework": 3,
            "classwork": 2,
            "attendance": 0,
            "behavior": 4,
            "extra": 4
        }
    }
}
```

```students/<student_id>```
Updates a student information
```json
{
    "update": {
        "givenNames": "Harry James",
        "surnames": "Potter Evans",
        "gender": "M"
    }
}
```

```subjects/<subject_id>```
Updates a subject information
```json
{
	"update": {
		"title": "Geografía"
	}
}
```

```terms/<term_id>```
Updates a term information
```json
{
	"update": {
		"title": "Semestre 1",
		"number": 1
	}
}
```

## DELETE

```students```
Deletes several students
```json
{
    "query": [1, 2, 3]
}
```

```subjects```
Deletes several subjects
```json
{
    "query": [1, 2, 3]
}
```

```terms```
Deletes several terms
```json
{
    "query": [1, 2, 3]
}
```

```courses/exam```
Deletes the exam for a given course
```json

```

## POST

```students```
Adds a new student
```json
{
    "student": {
        "givenNames": "Ginevra",
        "surnames": "Weasley Prewett",
        "gender": "F"
    }
}
```

```subjects```
Adds a new subject
```json
{
    "subject": {
        "title": "Español"
    }
}
```

```terms```
Add a new term
```json
{
    "term": {
        "title": "Tercer Término",
        "number": 3
    }
}
```

```courses/<course_id>/exam```
Adds an exam for a given course
```json

```