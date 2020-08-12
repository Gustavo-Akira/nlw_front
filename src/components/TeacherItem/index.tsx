import React from 'react';
import './styles.css';
import whatsapp from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
export interface Teacher{
    id:number,
    avatar:string,
    bio:string,
    cost:number,
    name:string,
    subject:string,
    whatsapp:string
}
interface TeacherProps{
    teacher:Teacher
}
const TeacherItem: React.FC<TeacherProps> = ({teacher})=>{
    function createConnection(){
        api.post('connections',{
            user_id:teacher.id
        })
    }
    return(
        <article className="teacher-item">
                    <header>
                    <img src={teacher.avatar} alt="Gustavo Akira"/>
                    <div>
                        <strong>{teacher.name}</strong>
                        <span>{teacher.subject}</span>
                    </div>
                    </header>
                    <p>
                        {teacher.bio}
                    </p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R${teacher.cost}</strong>
                        </p>
                        <a href={`https://wa.me/${teacher.whatsapp}`} onClick={createConnection}>
                            <img src={whatsapp} alt="Entrar em contato"/>
                            Entrar em contato
                        </a>
                    </footer>
                </article>
    );
}
export default TeacherItem;