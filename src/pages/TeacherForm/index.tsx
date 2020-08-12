import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import './index.css';
import warning from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems,setScheduleItems] = useState([{week_day: 0, from: '',to:''}]);
    function addNewSheduleItem(){
        scheduleItems.push();
        setScheduleItems([...scheduleItems,{
            week_day: 0, 
            from: '',
            to:''
        }]);
    }
    function handleCreateClass(e: FormEvent){
        e.preventDefault();
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule:scheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso');
            history.push('/');
        })
        .catch(()=>{
            alert('Erro no cadastro');
        });
    }
    function setScheduleItemValue(position: number, field:string, value:string){
        const newArray = scheduleItems.map((scheduleItem,index)=>{
            if(index === position){
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });
        setScheduleItems(newArray);
    }
    return(
        <div id="page-teacher-form">
            <PageHeader title="Que incrivel que você quer dar aulas"  description="O primeiro passo é preencher esse formulario de inscrição"/>
            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input name="name" label="Nome Completo" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <Input name="avatar" label="Avatar" value={avatar} onChange={(e)=>setAvatar(e.target.value)}/>
                    <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)}/>
                    <Textarea name="bio" label="Biografia" value={bio} onChange={(e)=>setBio(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={(e)=>setSubject(e.target.value)}
                    options ={[
                        {value:"Artes", label:"Artes"},
                        {value:"Biologia", label:"Biologia"},
                        {value:"Fisica", label:"Fisica"},
                        {value:"Matematica", label:"Matematica"}
                    ]}
                    />
                    <Input 
                    name="cost" 
                    label="Custo da sua hora por aula"
                    value={cost}
                    onChange={(e)=>setCost(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>
                        Horarios disponiveis 
                        <button type="button" onClick={addNewSheduleItem}>
                            Novo horario
                        </button>
                    </legend>
                    {scheduleItems.map((scheduleItem,index) =>{
                        return(
                            <div key={scheduleItem.week_day} className="schedule-item">
                        <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={scheduleItem.week_day}
                        onChange={e => setScheduleItemValue(index,'week_day',e.target.value)}
                        options ={[
                            {value:"0", label:"Domingo"},
                            {value:"1", label:"Segunda"},
                            {value:"2", label:"Terça"},
                            {value:"3", label:"Quarta"},
                            {value:"4", label:"Quinta"},
                            {value:"5", label:"Sexta"},
                            {value:"6", label:"Sabado"},
                        ]}
                        />
                        <Input
                            name="from"
                            label="Das"
                            type="time"
                            value={scheduleItem.from}
                            onChange={e=>setScheduleItemValue(index,'from',e.target.value)}
                        />
                        <Input
                            name="to"
                            label="Até"
                            type="time"
                            value={scheduleItem.to}
                            onChange={e=>setScheduleItemValue(index,'to',e.target.value)}
                        />
                    </div>
                        )
                    })}
                    
                </fieldset>
                <footer>
                    <p>
                        <img src={warning} alt="warning icon"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </footer>
                </form>
            </main>
        </div>
    )
}
export default TeacherForm;
