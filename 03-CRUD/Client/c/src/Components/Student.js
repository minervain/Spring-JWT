import React, { useEffect, useState } from 'react';

export default function Student() {
    const [name, setName] = useState('');
    const [lokasyon, setAddress] = useState('');
    const [students, setStudents] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        const student = { name, lokasyon };
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New Student added");
            fetchStudents();
        });
    };

    const fetchStudents = () => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div style={{ backgroundColor: 'lightgray', padding: '20px' }}>
            <form noValidate autoComplete="off" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
                <br />
                <input
                    type="text"
                    placeholder="Student Address"
                    value={lokasyon}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'lightblue',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={handleClick}
                >
                    Submit
                </button>
            </form>

            <h1>Students</h1>

            <div>
                {students.map(student => (
                    <div
                        key={student.id}
                        style={{
                            backgroundColor: 'white',
                            margin: '10px',
                            padding: '15px',
                            borderRadius: '5px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <strong>Id:</strong> {student.id}<br />
                        <strong>Name:</strong> {student.name}<br />
                        <strong>Address:</strong> {student.lokasyon}
                    </div>
                ))}
            </div>
        </div>
    );
}
