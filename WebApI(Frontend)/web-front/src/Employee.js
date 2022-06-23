import React, {Component}from "react";

import {Table} from "react-bootstrap";

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component{


    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

     componentDidMount(){
        this.refreshList();
     }   

     componentDidUpdate(){
        this.refreshList();
     }

     deleteDep(empid){
        console.log(11111)
        if(window.confirm("Are you sure?")){
            fetch(process.env.REACT_APP_API+'emplpyee/'+empid,{
                method:"DELETE",
                headers:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
     }


    render(){
        const {emps, empid, empname, depmt, photoFilename, doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow: false});
        let editModalClose=()=>this.setState({editModalShow: false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>

                        </tr>
                    </thead>

                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>

                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow: true, 
                                            empid:emp.EmployeeId, empname:emp.EmployeeName, depmt:emp.Department, photoFilename:emp.photoFilename,
                                            doj:emp.DateOfJoining})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteEmp(emp.DepartmentId)}>
                                            Delete
                                        </Button>

                                        <EditEmpModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        empid={empid}
                                        empname={empname}
                                        depmt={depmt}
                                        photofilename={photoFilename}
                                        doj={doj}
                                        />
                                    </ButtonToolbar>
                                </td>
                                



                            </tr> )}

                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow: true})}>
                    Add Employee
                    </Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                    
                </ButtonToolbar>
            </div>

            
            

        )
    }
}