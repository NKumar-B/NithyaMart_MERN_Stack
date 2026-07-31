import { useEffect, useState } from "react";
import axios from "axios";
function Spiderman() {
    const [Spidy, setSpidy] = useState([]);
    async function loadSpidy() {
        try {
            const response = await axios.get("http://localhost:5000/spidy_day");
            setSpidy(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadSpidy();
    }, []);
    return (
        <>
            <div>
                <h1>Spiderman's</h1>
                <table>
                    <thead>
                        <tr>
                            <th>S_no</th>
                            <th>Hero</th>
                            <th>Movie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Spidy.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.movie || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Spiderman;
