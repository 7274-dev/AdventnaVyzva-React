import { useState } from "react";
import "../styles/TeacherPage.css";

const SideBar = ({ onLinkClick }) => {
    const links = [
        "Dashboard",
        "Homework",
        "Students"
    ]

    return (
        <div className="sidebar">
            {
                links.map((link) => {
                    return (
                        <div className="link-container" onClick={ () => { onLinkClick(link.toLowerCase()) } }>
                            <h1 className="link">{ link }</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Dashboard = () => {
    return (
        <div>
            <h1>
                Dashboard
            </h1>
        </div>
    )
}

const Homework = () => {
    return (
        <div>
            <h1>
                Homework
            </h1>
        </div>
    )
}

const Students = () => {
    return (
        <div>
            <h1>
                Students
            </h1>
        </div>
    )
}

const TeacherPage = () => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg
    
    // pretty cluttered in my opinion. it should be simpler  // who wrote this?

    const [body, setBody] = useState(<div />);

    const onLinkClick = (link) => {
        console.log(link);

        switch (link) {
            case "dashboard":
                setBody(<div> <Dashboard /> </div>
                );
                break;

            case "homework":
                setBody(
                    <div> <Homework /> </div>
                );
                break;

            case "students":
                setBody(
                    <div> <Students /> </div>
                );
                break;

            default:
                setBody(
                    <div />
                );
                break;
        }
    }

    return (
        <div className="teacher-page">
            <SideBar onLinkClick={ onLinkClick } />

            { body }
        </div>
    )
}

export { TeacherPage };
