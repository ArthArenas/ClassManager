db.courses.insertMany(
    [
        {
            "term_id": ObjectId("5cafed1a623b19b674758abc"),
            "subject_id": ObjectId("5cafecd1623b19b674758aba"),
            "workload": {
                "finalExam": 5,
                "homework": 6,
                "classwork": 5,
                "attendance": 5,
                "behavior": 5,
                "extra": 5
            }
        },
        {
            "term_id": ObjectId("5cafed1a623b19b674758abc"),
            "subject_id": ObjectId("5cafecd1623b19b674758abb"),
            "workload": {
                "finalExam": 6,
                "homework": 7,
                "classwork": 6,
                "attendance": 5,
                "behavior": 5,
                "extra": 5
            }
        },
        {
            "term_id": ObjectId("5cafed1a623b19b674758abd"),
            "subject_id": ObjectId("5cafecd1623b19b674758aba"),
            "workload": {
                "finalExam": 3,
                "homework": 2,
                "classwork": 1,
                "attendance": 5,
                "behavior": 5,
                "extra": 5
            }
        },
        {
            "term_id": ObjectId("5cafed1a623b19b674758abd"),
            "subject_id": ObjectId("5cafecd1623b19b674758abb"),
            "workload": {
                "finalExam": 5,
                "homework": 6,
                "classwork": 7,
                "attendance": 5,
                "behavior": 5,
                "extra": 5
            }
        }
    ]
);