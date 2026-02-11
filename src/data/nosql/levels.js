// Auto-generated NoSQL Levels
export const nosqlLevels = [
    {
        "id": 1,
        "title": "NoSQL Level 1",
        "type": "NoSQL",
        "questions": [
            {
                "id": 1,
                "text": "Return all documents from users collection",
                "hint": "Try: db.users.find()",
                "expectedPattern": {
                    "script": "db.users.find()"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 2,
                "text": "Return only one document from users collection",
                "hint": "Try: db.users.findOne()",
                "expectedPattern": {
                    "script": "db.users.findOne()"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_find_one"
                ]
            },
            {
                "id": 3,
                "text": "Return only firstname of all users",
                "hint": "Try: db.users.find({}, { firstname: 1, _id: 0 })",
                "expectedPattern": {
                    "script": "db.users.find({}, { firstname: 1, _id: 0 })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 4,
                "text": "Return only lastname of all users",
                "hint": "Try: db.users.find({}, { lastname: 1, _id: 0 })",
                "expectedPattern": {
                    "script": "db.users.find({}, { lastname: 1, _id: 0 })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 5,
                "text": "Return firstname and lastname",
                "hint": "Try: db.users.find({}, { firstname: 1, lastname: 1, _id: 0 })",
                "expectedPattern": {
                    "script": "db.users.find({}, { firstname: 1, lastname: 1, _id: 0 })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 6,
                "text": "Find users from Chennai",
                "hint": "Try: db.users.find({ city: \"Chennai\" })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 7,
                "text": "Find users from Madurai",
                "hint": "Try: db.users.find({ city: \"Madurai\" })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Madurai\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 8,
                "text": "Find users whose age is 25",
                "hint": "Try: db.users.find({ age: 25 })",
                "expectedPattern": {
                    "script": "db.users.find({ age: 25 })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 9,
                "text": "Find users older than 25",
                "hint": "Try: db.users.find({ age: { $gt: 25 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gt: 25 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 10,
                "text": "Find users younger than 30",
                "hint": "Try: db.users.find({ age: { $lt: 30 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $lt: 30 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "NoSQL Level 2",
        "type": "NoSQL",
        "questions": [
            {
                "id": 11,
                "text": "Find users aged 18 or above",
                "hint": "Try: db.users.find({ age: { $gte: 18 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gte: 18 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 12,
                "text": "Find users aged 60 or below",
                "hint": "Try: db.users.find({ age: { $lte: 60 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $lte: 60 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 13,
                "text": "Find users between age 18 and 30",
                "hint": "Try: db.users.find({ age: { $gte: 18, $lte: 30 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gte: 18, $lte: 30 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 14,
                "text": "Get unique city names",
                "hint": "Try: db.users.distinct(\"city\")",
                "expectedPattern": {
                    "script": "db.users.distinct(\"city\")"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_distinct"
                ]
            },
            {
                "id": 15,
                "text": "Get unique gender values",
                "hint": "Try: db.users.distinct(\"gender\")",
                "expectedPattern": {
                    "script": "db.users.distinct(\"gender\")"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_distinct"
                ]
            },
            {
                "id": 16,
                "text": "Find users whose firstname is not null",
                "hint": "Try: db.users.find({ firstname: { $ne: null } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $ne: null } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 17,
                "text": "Find users whose email exists",
                "hint": "Try: db.users.find({ email: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 18,
                "text": "Find users whose phone does not exist",
                "hint": "Try: db.users.find({ phone: { $exists: false } })",
                "expectedPattern": {
                    "script": "db.users.find({ phone: { $exists: false } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 19,
                "text": "Find active users",
                "hint": "Try: db.users.find({ isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 20,
                "text": "Find inactive users",
                "hint": "Try: db.users.find({ isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 3,
        "title": "NoSQL Level 3",
        "type": "NoSQL",
        "questions": [
            {
                "id": 21,
                "text": "Sort users by age in ascending order",
                "hint": "Try: db.users.find().sort({ age: 1 })",
                "expectedPattern": {
                    "script": "db.users.find().sort({ age: 1 })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_sort"
                ]
            },
            {
                "id": 22,
                "text": "Sort users by age in descending order",
                "hint": "Try: db.users.find().sort({ age: -1 })",
                "expectedPattern": {
                    "script": "db.users.find().sort({ age: -1 })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_sort"
                ]
            },
            {
                "id": 23,
                "text": "Sort users by firstname alphabetically",
                "hint": "Try: db.users.find().sort({ firstname: 1 })",
                "expectedPattern": {
                    "script": "db.users.find().sort({ firstname: 1 })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_sort"
                ]
            },
            {
                "id": 24,
                "text": "Get first 5 users",
                "hint": "Try: db.users.find().limit(5)",
                "expectedPattern": {
                    "script": "db.users.find().limit(5)"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_limit"
                ]
            },
            {
                "id": 25,
                "text": "Skip first 5 users",
                "hint": "Try: db.users.find().skip(5)",
                "expectedPattern": {
                    "script": "db.users.find().skip(5)"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_skip"
                ]
            },
            {
                "id": 26,
                "text": "Skip 5 users and get next 5",
                "hint": "Try: db.users.find().skip(5).limit(5)",
                "expectedPattern": {
                    "script": "db.users.find().skip(5).limit(5)"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_limit",
                    "nosql_skip"
                ]
            },
            {
                "id": 27,
                "text": "Count total number of users",
                "hint": "Try: db.users.countDocuments()",
                "expectedPattern": {
                    "script": "db.users.countDocuments()"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_count"
                ]
            },
            {
                "id": 28,
                "text": "Count users from Chennai",
                "hint": "Try: db.users.countDocuments({ city: \"Chennai\" })",
                "expectedPattern": {
                    "script": "db.users.countDocuments({ city: \"Chennai\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_count"
                ]
            },
            {
                "id": 29,
                "text": "Count active users",
                "hint": "Try: db.users.countDocuments({ isActive: true })",
                "expectedPattern": {
                    "script": "db.users.countDocuments({ isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_count"
                ]
            },
            {
                "id": 30,
                "text": "Count inactive users",
                "hint": "Try: db.users.countDocuments({ isActive: false })",
                "expectedPattern": {
                    "script": "db.users.countDocuments({ isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_count"
                ]
            }
        ]
    },
    {
        "id": 4,
        "title": "NoSQL Level 4",
        "type": "NoSQL",
        "questions": [
            {
                "id": 31,
                "text": "Find users whose salary is 30000",
                "hint": "Try: db.users.find({ salary: 30000 })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: 30000 })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 32,
                "text": "Find users with salary greater than 20000",
                "hint": "Try: db.users.find({ salary: { $gt: 20000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gt: 20000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 33,
                "text": "Find users with salary less than 50000",
                "hint": "Try: db.users.find({ salary: { $lt: 50000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $lt: 50000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 34,
                "text": "Find users with salary between 20000 and 50000",
                "hint": "Try: db.users.find({ salary: { $gte: 20000, $lte: 50000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gte: 20000, $lte: 50000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 35,
                "text": "Find users whose role is Admin",
                "hint": "Try: db.users.find({ role: \"Admin\" })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"Admin\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 36,
                "text": "Find users whose role is User",
                "hint": "Try: db.users.find({ role: \"User\" })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"User\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 37,
                "text": "Find users whose role is not Admin",
                "hint": "Try: db.users.find({ role: { $ne: \"Admin\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $ne: \"Admin\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 38,
                "text": "Find users from Chennai or Madurai",
                "hint": "Try: db.users.find({ city: { $in: [\"Chennai\", \"Madurai\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $in: [\"Chennai\", \"Madurai\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 39,
                "text": "Find users not from Delhi",
                "hint": "Try: db.users.find({ city: { $ne: \"Delhi\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $ne: \"Delhi\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 40,
                "text": "Find users whose age is not 25",
                "hint": "Try: db.users.find({ age: { $ne: 25 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $ne: 25 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 5,
        "title": "NoSQL Level 5",
        "type": "NoSQL",
        "questions": [
            {
                "id": 41,
                "text": "Find male users",
                "hint": "Try: db.users.find({ gender: \"Male\" })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: \"Male\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 42,
                "text": "Find female users",
                "hint": "Try: db.users.find({ gender: \"Female\" })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: \"Female\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 43,
                "text": "Find users whose gender is not Male",
                "hint": "Try: db.users.find({ gender: { $ne: \"Male\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: { $ne: \"Male\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 44,
                "text": "Find users whose firstname starts with 'A'",
                "hint": "Try: db.users.find({ firstname: { $regex: \"^A\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"^A\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 45,
                "text": "Find users whose firstname ends with 'a'",
                "hint": "Try: db.users.find({ firstname: { $regex: \"a$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"a$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 46,
                "text": "Case-insensitive search for firstname 'priya'",
                "hint": "Try: db.users.find({ firstname: { $regex: \"priya\", $options: \"i\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"priya\", $options: \"i\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 47,
                "text": "Find users whose email contains 'gmail'",
                "hint": "Try: db.users.find({ email: { $regex: \"gmail\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \"gmail\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 48,
                "text": "Find users having skill Python",
                "hint": "Try: db.users.find({ skills: \"Python\" })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: \"Python\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 49,
                "text": "Find users having skill Java",
                "hint": "Try: db.users.find({ skills: \"Java\" })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: \"Java\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 50,
                "text": "Find users having skill MongoDB",
                "hint": "Try: db.users.find({ skills: \"MongoDB\" })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: \"MongoDB\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 6,
        "title": "NoSQL Level 6",
        "type": "NoSQL",
        "questions": [
            {
                "id": 51,
                "text": "Find users having both Python and Java",
                "hint": "Try: db.users.find({ skills: { $all: [\"Python\", \"Java\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $all: [\"Python\", \"Java\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 52,
                "text": "Find users with exactly 2 skills",
                "hint": "Try: db.users.find({ skills: { $size: 2 } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $size: 2 } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 53,
                "text": "Find users whose age is even",
                "hint": "Try: db.users.find({ age: { $mod: [2, 0] } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $mod: [2, 0] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 54,
                "text": "Find users whose age is odd",
                "hint": "Try: db.users.find({ age: { $mod: [2, 1] } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $mod: [2, 1] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 55,
                "text": "Find users with salary not equal to 30000",
                "hint": "Try: db.users.find({ salary: { $ne: 30000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $ne: 30000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 56,
                "text": "Find users whose city is Chennai and active",
                "hint": "Try: db.users.find({ city: \"Chennai\", isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 57,
                "text": "Find users whose city is Chennai and salary > 30000",
                "hint": "Try: db.users.find({ city: \"Chennai\", salary: { $gt: 30000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", salary: { $gt: 30000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 58,
                "text": "Find users whose age > 25 and salary > 40000",
                "hint": "Try: db.users.find({ age: { $gt: 25 }, salary: { $gt: 40000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gt: 25 }, salary: { $gt: 40000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 59,
                "text": "Find users whose city is Chennai and gender is Female",
                "hint": "Try: db.users.find({ city: \"Chennai\", gender: \"Female\" })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", gender: \"Female\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 60,
                "text": "Find users whose role is Admin and active",
                "hint": "Try: db.users.find({ role: \"Admin\", isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"Admin\", isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 7,
        "title": "NoSQL Level 7",
        "type": "NoSQL",
        "questions": [
            {
                "id": 61,
                "text": "Find users whose city is Chennai or Bangalore",
                "hint": "Try: db.users.find({ $or: [{ city: \"Chennai\" }, { city: \"Bangalore\" }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ city: \"Chennai\" }, { city: \"Bangalore\" }] })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 62,
                "text": "Find users whose age < 20 or > 50",
                "hint": "Try: db.users.find({ $or: [{ age: { $lt: 20 } }, { age: { $gt: 50 } }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ age: { $lt: 20 } }, { age: { $gt: 50 } }] })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 63,
                "text": "Find users whose city is not Chennai or Delhi",
                "hint": "Try: db.users.find({ city: { $nin: [\"Chennai\", \"Delhi\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $nin: [\"Chennai\", \"Delhi\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 64,
                "text": "Find users whose age is in 20, 25, 30",
                "hint": "Try: db.users.find({ age: { $in: [20, 25, 30] } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $in: [20, 25, 30] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 65,
                "text": "Find users whose salary is in 20000, 30000",
                "hint": "Try: db.users.find({ salary: { $in: [20000, 30000] } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $in: [20000, 30000] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 66,
                "text": "Find users whose email ends with .com",
                "hint": "Try: db.users.find({ email: { $regex: \".com$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \".com$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 67,
                "text": "Find users whose email is Gmail",
                "hint": "Try: db.users.find({ email: { $regex: \"@gmail.com$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \"@gmail.com$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 68,
                "text": "Find users whose firstname length is not null",
                "hint": "Try: db.users.find({ firstname: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 69,
                "text": "Find users whose salary exists",
                "hint": "Try: db.users.find({ salary: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 70,
                "text": "Find users whose role exists",
                "hint": "Try: db.users.find({ role: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 8,
        "title": "NoSQL Level 8",
        "type": "NoSQL",
        "questions": [
            {
                "id": 71,
                "text": "Find users whose city exists",
                "hint": "Try: db.users.find({ city: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 72,
                "text": "Find users whose age exists",
                "hint": "Try: db.users.find({ age: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 73,
                "text": "Find users whose skills exist",
                "hint": "Try: db.users.find({ skills: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 74,
                "text": "Find users whose skills field is empty array",
                "hint": "Try: db.users.find({ skills: { $size: 0 } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $size: 0 } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 75,
                "text": "Find users whose age is not between 20 and 30",
                "hint": "Try: db.users.find({ age: { $not: { $gte: 20, $lte: 30 } } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $not: { $gte: 20, $lte: 30 } } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 76,
                "text": "Find users whose city starts with 'M'",
                "hint": "Try: db.users.find({ city: { $regex: \"^M\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $regex: \"^M\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 77,
                "text": "Find users whose city ends with 'i'",
                "hint": "Try: db.users.find({ city: { $regex: \"i$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $regex: \"i$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 78,
                "text": "Find users whose firstname contains 'an'",
                "hint": "Try: db.users.find({ firstname: { $regex: \"an\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"an\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 79,
                "text": "Find users whose lastname contains 'ra'",
                "hint": "Try: db.users.find({ lastname: { $regex: \"ra\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ lastname: { $regex: \"ra\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 80,
                "text": "Find users whose role is not User",
                "hint": "Try: db.users.find({ role: { $ne: \"User\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $ne: \"User\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 9,
        "title": "NoSQL Level 9",
        "type": "NoSQL",
        "questions": [
            {
                "id": 81,
                "text": "Find users whose salary >= 50000",
                "hint": "Try: db.users.find({ salary: { $gte: 50000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gte: 50000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 82,
                "text": "Find users whose salary <= 20000",
                "hint": "Try: db.users.find({ salary: { $lte: 20000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $lte: 20000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 83,
                "text": "Find users whose city is Chennai and age < 30",
                "hint": "Try: db.users.find({ city: \"Chennai\", age: { $lt: 30 } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", age: { $lt: 30 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 84,
                "text": "Find users whose city is Chennai and age > 30",
                "hint": "Try: db.users.find({ city: \"Chennai\", age: { $gt: 30 } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", age: { $gt: 30 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 85,
                "text": "Find users whose gender is Female and active",
                "hint": "Try: db.users.find({ gender: \"Female\", isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: \"Female\", isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 86,
                "text": "Find users whose gender is Male and inactive",
                "hint": "Try: db.users.find({ gender: \"Male\", isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: \"Male\", isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 87,
                "text": "Find users whose salary is greater than age Ã— 1000",
                "hint": "Try: db.users.find({ $expr: { $gt: [\"$salary\", { $multiply: [\"$age\", 1000] }] } })",
                "expectedPattern": {
                    "script": "db.users.find({ $expr: { $gt: [\"$salary\", { $multiply: [\"$age\", 1000] }] } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 88,
                "text": "Find users whose firstname and lastname exist",
                "hint": "Try: db.users.find({ firstname: { $exists: true }, lastname: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $exists: true }, lastname: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 89,
                "text": "Find users whose email is null",
                "hint": "Try: db.users.find({ email: null })",
                "expectedPattern": {
                    "script": "db.users.find({ email: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 90,
                "text": "Find users whose phone is null",
                "hint": "Try: db.users.find({ phone: null })",
                "expectedPattern": {
                    "script": "db.users.find({ phone: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 10,
        "title": "NoSQL Level 10",
        "type": "NoSQL",
        "questions": [
            {
                "id": 91,
                "text": "Find users whose city is Chennai and skills include Python",
                "hint": "Try: db.users.find({ city: \"Chennai\", skills: \"Python\" })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", skills: \"Python\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 92,
                "text": "Find users whose age > 25 and skills include Java",
                "hint": "Try: db.users.find({ age: { $gt: 25 }, skills: \"Java\" })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gt: 25 }, skills: \"Java\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 93,
                "text": "Find users whose role is Admin and salary > 50000",
                "hint": "Try: db.users.find({ role: \"Admin\", salary: { $gt: 50000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"Admin\", salary: { $gt: 50000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 94,
                "text": "Find users whose role is User and active",
                "hint": "Try: db.users.find({ role: \"User\", isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"User\", isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 95,
                "text": "Find users whose salary is not null",
                "hint": "Try: db.users.find({ salary: { $ne: null } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $ne: null } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 96,
                "text": "Find users whose age is not null",
                "hint": "Try: db.users.find({ age: { $ne: null } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $ne: null } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 97,
                "text": "Find users whose firstname is Mohana",
                "hint": "Try: db.users.find({ firstname: \"Mohana\" })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: \"Mohana\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 98,
                "text": "Find users whose lastname is Priya",
                "hint": "Try: db.users.find({ lastname: \"Priya\" })",
                "expectedPattern": {
                    "script": "db.users.find({ lastname: \"Priya\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 99,
                "text": "Find users whose city is Chennai and role is User",
                "hint": "Try: db.users.find({ city: \"Chennai\", role: \"User\" })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", role: \"User\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 100,
                "text": "Find users whose age is greater than 18 and active",
                "hint": "Try: db.users.find({ age: { $gt: 18 }, isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gt: 18 }, isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 11,
        "title": "NoSQL Level 11",
        "type": "NoSQL",
        "questions": [
            {
                "id": 101,
                "text": "Find users from Chennai AND age greater than 25",
                "hint": "Try: db.users.find({ city: \"Chennai\", age: { $gt: 25 } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", age: { $gt: 25 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 102,
                "text": "Find users from Chennai OR Madurai",
                "hint": "Try: db.users.find({ $or: [{ city: \"Chennai\" }, { city: \"Madurai\" }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ city: \"Chennai\" }, { city: \"Madurai\" }] })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 103,
                "text": "Find users whose age is less than 20 OR greater than 50",
                "hint": "Try: db.users.find({ $or: [{ age: { $lt: 20 } }, { age: { $gt: 50 } }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ age: { $lt: 20 } }, { age: { $gt: 50 } }] })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 104,
                "text": "Find users whose city is NOT Chennai",
                "hint": "Try: db.users.find({ city: { $ne: \"Chennai\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $ne: \"Chennai\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 105,
                "text": "Find users whose city is in Chennai, Madurai, Bangalore",
                "hint": "Try: db.users.find({ city: { $in: [\"Chennai\", \"Madurai\", \"Bangalore\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $in: [\"Chennai\", \"Madurai\", \"Bangalore\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 106,
                "text": "Find users whose city is NOT in Chennai, Delhi",
                "hint": "Try: db.users.find({ city: { $nin: [\"Chennai\", \"Delhi\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $nin: [\"Chennai\", \"Delhi\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 107,
                "text": "Find users with salary greater than 30000",
                "hint": "Try: db.users.find({ salary: { $gt: 30000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gt: 30000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 108,
                "text": "Find users with salary between 25000 and 60000",
                "hint": "Try: db.users.find({ salary: { $gte: 25000, $lte: 60000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gte: 25000, $lte: 60000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 109,
                "text": "Find users whose salary is NOT equal to 40000",
                "hint": "Try: db.users.find({ salary: { $ne: 40000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $ne: 40000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 110,
                "text": "Find users with salary in 20000, 30000, 40000",
                "hint": "Try: db.users.find({ salary: { $in: [20000, 30000, 40000] } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $in: [20000, 30000, 40000] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 12,
        "title": "NoSQL Level 12",
        "type": "NoSQL",
        "questions": [
            {
                "id": 111,
                "text": "Find users whose firstname starts with \"A\"",
                "hint": "Try: db.users.find({ firstname: { $regex: \"^A\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"^A\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 112,
                "text": "Find users whose firstname ends with \"a\"",
                "hint": "Try: db.users.find({ firstname: { $regex: \"a$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"a$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 113,
                "text": "Case-insensitive search for firstname \"mohana\"",
                "hint": "Try: db.users.find({ firstname: { $regex: \"mohana\", $options: \"i\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"mohana\", $options: \"i\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 114,
                "text": "Find users whose email contains \"gmail\"",
                "hint": "Try: db.users.find({ email: { $regex: \"gmail\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \"gmail\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 115,
                "text": "Find users whose email ends with \"@gmail.com\"",
                "hint": "Try: db.users.find({ email: { $regex: \"@gmail.com$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \"@gmail.com$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 116,
                "text": "Find users having skill Python",
                "hint": "Try: db.users.find({ skills: \"Python\" })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: \"Python\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 117,
                "text": "Find users having both Python and Java",
                "hint": "Try: db.users.find({ skills: { $all: [\"Python\", \"Java\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $all: [\"Python\", \"Java\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 118,
                "text": "Find users having either Python or Java",
                "hint": "Try: db.users.find({ skills: { $in: [\"Python\", \"Java\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $in: [\"Python\", \"Java\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 119,
                "text": "Find users having exactly 2 skills",
                "hint": "Try: db.users.find({ skills: { $size: 2 } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $size: 2 } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 120,
                "text": "Find users having more than one skill",
                "hint": "Try: db.users.find({ $expr: { $gt: [{ $size: \"$skills\" }, 1] } })",
                "expectedPattern": {
                    "script": "db.users.find({ $expr: { $gt: [{ $size: \"$skills\" }, 1] } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 13,
        "title": "NoSQL Level 13",
        "type": "NoSQL",
        "questions": [
            {
                "id": 121,
                "text": "Find users whose age is even",
                "hint": "Try: db.users.find({ age: { $mod: [2, 0] } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $mod: [2, 0] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 122,
                "text": "Find users whose age is odd",
                "hint": "Try: db.users.find({ age: { $mod: [2, 1] } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $mod: [2, 1] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 123,
                "text": "Find users whose phone field exists",
                "hint": "Try: db.users.find({ phone: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ phone: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 124,
                "text": "Find users whose phone field does not exist",
                "hint": "Try: db.users.find({ phone: { $exists: false } })",
                "expectedPattern": {
                    "script": "db.users.find({ phone: { $exists: false } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 125,
                "text": "Find users whose email is null",
                "hint": "Try: db.users.find({ email: null })",
                "expectedPattern": {
                    "script": "db.users.find({ email: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 126,
                "text": "Find users whose firstname is not null",
                "hint": "Try: db.users.find({ firstname: { $ne: null } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $ne: null } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 127,
                "text": "Find users whose salary field exists",
                "hint": "Try: db.users.find({ salary: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 128,
                "text": "Find users whose salary field does not exist",
                "hint": "Try: db.users.find({ salary: { $exists: false } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $exists: false } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 129,
                "text": "Find users whose age is not between 20 and 30",
                "hint": "Try: db.users.find({ age: { $not: { $gte: 20, $lte: 30 } } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $not: { $gte: 20, $lte: 30 } } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 130,
                "text": "Find users whose city starts with \"M\"",
                "hint": "Try: db.users.find({ city: { $regex: \"^M\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $regex: \"^M\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 14,
        "title": "NoSQL Level 14",
        "type": "NoSQL",
        "questions": [
            {
                "id": 131,
                "text": "Find users whose city ends with \"i\"",
                "hint": "Try: db.users.find({ city: { $regex: \"i$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $regex: \"i$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 132,
                "text": "Find users whose firstname contains \"an\"",
                "hint": "Try: db.users.find({ firstname: { $regex: \"an\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"an\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 133,
                "text": "Find users whose lastname contains \"ra\"",
                "hint": "Try: db.users.find({ lastname: { $regex: \"ra\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ lastname: { $regex: \"ra\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 134,
                "text": "Find users whose role is Admin AND active",
                "hint": "Try: db.users.find({ role: \"Admin\", isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"Admin\", isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 135,
                "text": "Find users whose role is User AND inactive",
                "hint": "Try: db.users.find({ role: \"User\", isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"User\", isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 136,
                "text": "Find users whose role is not Admin",
                "hint": "Try: db.users.find({ role: { $ne: \"Admin\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $ne: \"Admin\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 137,
                "text": "Find users whose gender is Female AND age > 25",
                "hint": "Try: db.users.find({ gender: \"Female\", age: { $gt: 25 } })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: \"Female\", age: { $gt: 25 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 138,
                "text": "Find users whose gender is Male AND salary > 40000",
                "hint": "Try: db.users.find({ gender: \"Male\", salary: { $gt: 40000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ gender: \"Male\", salary: { $gt: 40000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 139,
                "text": "Find users whose city is Chennai AND skill is Python",
                "hint": "Try: db.users.find({ city: \"Chennai\", skills: \"Python\" })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", skills: \"Python\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 140,
                "text": "Find users whose age > 25 AND skill is Java",
                "hint": "Try: db.users.find({ age: { $gt: 25 }, skills: \"Java\" })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gt: 25 }, skills: \"Java\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 15,
        "title": "NoSQL Level 15",
        "type": "NoSQL",
        "questions": [
            {
                "id": 141,
                "text": "Find users whose city is Chennai OR skill is MongoDB",
                "hint": "Try: db.users.find({ $or: [{ city: \"Chennai\" }, { skills: \"MongoDB\" }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ city: \"Chennai\" }, { skills: \"MongoDB\" }] })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 142,
                "text": "Find users whose salary > 30000 OR role is Admin",
                "hint": "Try: db.users.find({ $or: [{ salary: { $gt: 30000 } }, { role: \"Admin\" }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ salary: { $gt: 30000 } }, { role: \"Admin\" }] })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 143,
                "text": "Find users whose city is Chennai AND age < 30 AND active",
                "hint": "Try: db.users.find({ city: \"Chennai\", age: { $lt: 30 }, isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", age: { $lt: 30 }, isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 144,
                "text": "Find users whose salary > 50000 AND role is Admin",
                "hint": "Try: db.users.find({ salary: { $gt: 50000 }, role: \"Admin\" })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gt: 50000 }, role: \"Admin\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 145,
                "text": "Find users whose salary > 40000 AND age < 35",
                "hint": "Try: db.users.find({ salary: { $gt: 40000 }, age: { $lt: 35 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gt: 40000 }, age: { $lt: 35 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 146,
                "text": "Find users whose firstname and lastname exist",
                "hint": "Try: db.users.find({ firstname: { $exists: true }, lastname: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $exists: true }, lastname: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 147,
                "text": "Find users whose city and salary exist",
                "hint": "Try: db.users.find({ city: { $exists: true }, salary: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $exists: true }, salary: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 148,
                "text": "Find users whose skills array exists",
                "hint": "Try: db.users.find({ skills: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 149,
                "text": "Find users whose skills array is empty",
                "hint": "Try: db.users.find({ skills: { $size: 0 } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $size: 0 } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 150,
                "text": "Find users whose salary is greater than age Ã— 1000",
                "hint": "Try: db.users.find({",
                "expectedPattern": {
                    "script": "db.users.find({"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 16,
        "title": "NoSQL Level 16",
        "type": "NoSQL",
        "questions": [
            {
                "id": 151,
                "text": "Find users whose age is greater than salary / 1000",
                "hint": "Try: db.users.find({",
                "expectedPattern": {
                    "script": "db.users.find({"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 152,
                "text": "Find users whose age equals salary / 1000",
                "hint": "Try: db.users.find({",
                "expectedPattern": {
                    "script": "db.users.find({"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 153,
                "text": "Find users whose age is not equal to salary / 1000",
                "hint": "Try: db.users.find({",
                "expectedPattern": {
                    "script": "db.users.find({"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 154,
                "text": "Find users whose salary + bonus field exists",
                "hint": "Try: db.users.find({ salary: { $exists: true }, bonus: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $exists: true }, bonus: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 155,
                "text": "Find users whose city is Chennai and not active",
                "hint": "Try: db.users.find({ city: \"Chennai\", isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 156,
                "text": "Find users whose city is not Chennai AND salary > 30000",
                "hint": "Try: db.users.find({ city: { $ne: \"Chennai\" }, salary: { $gt: 30000 } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $ne: \"Chennai\" }, salary: { $gt: 30000 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 157,
                "text": "Find users whose gender is Female OR role is Admin",
                "hint": "Try: db.users.find({ $or: [{ gender: \"Female\" }, { role: \"Admin\" }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ gender: \"Female\" }, { role: \"Admin\" }] })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 158,
                "text": "Find users whose age < 25 AND city is Madurai",
                "hint": "Try: db.users.find({ age: { $lt: 25 }, city: \"Madurai\" })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $lt: 25 }, city: \"Madurai\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 159,
                "text": "Find users whose salary > 60000 OR active",
                "hint": "Try: db.users.find({ $or: [{ salary: { $gt: 60000 } }, { isActive: true }] })",
                "expectedPattern": {
                    "script": "db.users.find({ $or: [{ salary: { $gt: 60000 } }, { isActive: true }] })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 160,
                "text": "Find users whose skill is not Python",
                "hint": "Try: db.users.find({ skills: { $ne: \"Python\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: { $ne: \"Python\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 17,
        "title": "NoSQL Level 17",
        "type": "NoSQL",
        "questions": [
            {
                "id": 161,
                "text": "Find users whose role is Admin or Manager",
                "hint": "Try: db.users.find({ role: { $in: [\"Admin\", \"Manager\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $in: [\"Admin\", \"Manager\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 162,
                "text": "Find users whose role is neither Admin nor Manager",
                "hint": "Try: db.users.find({ role: { $nin: [\"Admin\", \"Manager\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $nin: [\"Admin\", \"Manager\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 163,
                "text": "Find users whose city matches \"chen\" (case-insensitive)",
                "hint": "Try: db.users.find({ city: { $regex: \"chen\", $options: \"i\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $regex: \"chen\", $options: \"i\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 164,
                "text": "Find users whose firstname length is more than 5 characters",
                "hint": "Try: db.users.find({ $expr: { $gt: [{ $strLenCP: \"$firstname\" }, 5] } })",
                "expectedPattern": {
                    "script": "db.users.find({ $expr: { $gt: [{ $strLenCP: \"$firstname\" }, 5] } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 165,
                "text": "Find users whose lastname length is less than 6 characters",
                "hint": "Try: db.users.find({ $expr: { $lt: [{ $strLenCP: \"$lastname\" }, 6] } })",
                "expectedPattern": {
                    "script": "db.users.find({ $expr: { $lt: [{ $strLenCP: \"$lastname\" }, 6] } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 166,
                "text": "Find users whose salary is divisible by 5000",
                "hint": "Try: db.users.find({ salary: { $mod: [5000, 0] } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $mod: [5000, 0] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 167,
                "text": "Find users whose age is divisible by 5",
                "hint": "Try: db.users.find({ age: { $mod: [5, 0] } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $mod: [5, 0] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 168,
                "text": "Find users whose salary is not divisible by 10000",
                "hint": "Try: db.users.find({ salary: { $mod: [10000, 1] } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $mod: [10000, 1] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 169,
                "text": "Find users whose email starts with 'a'",
                "hint": "Try: db.users.find({ email: { $regex: \"^a\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \"^a\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 170,
                "text": "Find users whose email ends with '.org'",
                "hint": "Try: db.users.find({ email: { $regex: \".org$\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $regex: \".org$\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            }
        ]
    },
    {
        "id": 18,
        "title": "NoSQL Level 18",
        "type": "NoSQL",
        "questions": [
            {
                "id": 171,
                "text": "Find users whose firstname is either Mohana or Priya",
                "hint": "Try: db.users.find({ firstname: { $in: [\"Mohana\", \"Priya\"] } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $in: [\"Mohana\", \"Priya\"] } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 172,
                "text": "Find users whose lastname is not Priya",
                "hint": "Try: db.users.find({ lastname: { $ne: \"Priya\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ lastname: { $ne: \"Priya\" } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 173,
                "text": "Find users whose salary is between 30000 and 70000 and active",
                "hint": "Try: db.users.find({ salary: { $gte: 30000, $lte: 70000 }, isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gte: 30000, $lte: 70000 }, isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 174,
                "text": "Find users whose age is between 25 and 40 and city is Chennai",
                "hint": "Try: db.users.find({ age: { $gte: 25, $lte: 40 }, city: \"Chennai\" })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gte: 25, $lte: 40 }, city: \"Chennai\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 175,
                "text": "Find users whose skills include MongoDB and city is Bangalore",
                "hint": "Try: db.users.find({ skills: \"MongoDB\", city: \"Bangalore\" })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: \"MongoDB\", city: \"Bangalore\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 176,
                "text": "Find users whose role is User and skill is Python",
                "hint": "Try: db.users.find({ role: \"User\", skills: \"Python\" })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"User\", skills: \"Python\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 177,
                "text": "Find users whose role is Admin and skill is MongoDB",
                "hint": "Try: db.users.find({ role: \"Admin\", skills: \"MongoDB\" })",
                "expectedPattern": {
                    "script": "db.users.find({ role: \"Admin\", skills: \"MongoDB\" })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 178,
                "text": "Find users whose salary > 50000 and skill is Java",
                "hint": "Try: db.users.find({ salary: { $gt: 50000 }, skills: \"Java\" })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gt: 50000 }, skills: \"Java\" })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 179,
                "text": "Find users whose city is Madurai and active",
                "hint": "Try: db.users.find({ city: \"Madurai\", isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Madurai\", isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 180,
                "text": "Find users whose age < 30 and inactive",
                "hint": "Try: db.users.find({ age: { $lt: 30 }, isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $lt: 30 }, isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 19,
        "title": "NoSQL Level 19",
        "type": "NoSQL",
        "questions": [
            {
                "id": 181,
                "text": "Find users whose firstname contains letter 'i'",
                "hint": "Try: db.users.find({ firstname: { $regex: \"i\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ firstname: { $regex: \"i\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 182,
                "text": "Find users whose lastname starts with 'S'",
                "hint": "Try: db.users.find({ lastname: { $regex: \"^S\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ lastname: { $regex: \"^S\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 183,
                "text": "Find users whose city contains 'ra'",
                "hint": "Try: db.users.find({ city: { $regex: \"ra\" } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $regex: \"ra\" } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 184,
                "text": "Find users whose salary > 35000 and age > 28",
                "hint": "Try: db.users.find({ salary: { $gt: 35000 }, age: { $gt: 28 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $gt: 35000 }, age: { $gt: 28 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 185,
                "text": "Find users whose city is Chennai and role is Admin or User",
                "hint": "Try: db.users.find({",
                "expectedPattern": {
                    "script": "db.users.find({"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 186,
                "text": "Find users whose age is null",
                "hint": "Try: db.users.find({ age: null })",
                "expectedPattern": {
                    "script": "db.users.find({ age: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 187,
                "text": "Find users whose salary is null",
                "hint": "Try: db.users.find({ salary: null })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 188,
                "text": "Find users whose role is null",
                "hint": "Try: db.users.find({ role: null })",
                "expectedPattern": {
                    "script": "db.users.find({ role: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 189,
                "text": "Find users whose skills field is null",
                "hint": "Try: db.users.find({ skills: null })",
                "expectedPattern": {
                    "script": "db.users.find({ skills: null })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 190,
                "text": "Find users whose email is not null",
                "hint": "Try: db.users.find({ email: { $ne: null } })",
                "expectedPattern": {
                    "script": "db.users.find({ email: { $ne: null } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    },
    {
        "id": 20,
        "title": "NoSQL Level 20",
        "type": "NoSQL",
        "questions": [
            {
                "id": 191,
                "text": "Find users whose city is Chennai and email exists",
                "hint": "Try: db.users.find({ city: \"Chennai\", email: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ city: \"Chennai\", email: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 192,
                "text": "Find users whose salary exists and active",
                "hint": "Try: db.users.find({ salary: { $exists: true }, isActive: true })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $exists: true }, isActive: true })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 193,
                "text": "Find users whose age exists and inactive",
                "hint": "Try: db.users.find({ age: { $exists: true }, isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $exists: true }, isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 194,
                "text": "Find users whose skills exist and size > 1",
                "hint": "Try: db.users.find({ $expr: { $gt: [{ $size: \"$skills\" }, 1] } })",
                "expectedPattern": {
                    "script": "db.users.find({ $expr: { $gt: [{ $size: \"$skills\" }, 1] } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 195,
                "text": "Find users whose city is not Chennai and not active",
                "hint": "Try: db.users.find({ city: { $ne: \"Chennai\" }, isActive: false })",
                "expectedPattern": {
                    "script": "db.users.find({ city: { $ne: \"Chennai\" }, isActive: false })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 196,
                "text": "Find users whose age > 25 and city exists",
                "hint": "Try: db.users.find({ age: { $gt: 25 }, city: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ age: { $gt: 25 }, city: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 197,
                "text": "Find users whose salary < 30000 and role exists",
                "hint": "Try: db.users.find({ salary: { $lt: 30000 }, role: { $exists: true } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $lt: 30000 }, role: { $exists: true } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 198,
                "text": "Find users whose role exists and is not null",
                "hint": "Try: db.users.find({ role: { $exists: true, $ne: null } })",
                "expectedPattern": {
                    "script": "db.users.find({ role: { $exists: true, $ne: null } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            },
            {
                "id": 199,
                "text": "Find users whose firstname exists and length < 5",
                "hint": "Try: db.users.find({",
                "expectedPattern": {
                    "script": "db.users.find({"
                },
                "allowedBlocks": [
                    "nosql_find"
                ]
            },
            {
                "id": 200,
                "text": "Find users whose salary exists and > 0",
                "hint": "Try: db.users.find({ salary: { $exists: true, $gt: 0 } })",
                "expectedPattern": {
                    "script": "db.users.find({ salary: { $exists: true, $gt: 0 } })"
                },
                "allowedBlocks": [
                    "nosql_find",
                    "nosql_comparison",
                    "nosql_logical"
                ]
            }
        ]
    }
];
