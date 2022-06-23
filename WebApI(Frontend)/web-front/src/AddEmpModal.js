import React,{ Component} from "react";
import { Modal,Button, Row, Col, Form,Image } from "react-bootstrap";



export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        //构造函数绑定加载方法
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }
    
    photofilename="anonymous.png";
    imagesrc=process.env.REACT_APP_API1+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+"department")
        .then(reponse=>reponse.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        console.log(process.env.REACT_APP_API)
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:null,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,
                Photofilename:this.photofilename
            })
        }
        )
        .then(res=>res.json())
        .then(
            (result)=>{
            alert(result);
        },
        (error)=>{
            alert('Falied');
        })
    }
    

    handleFileSelected(event){
        event.preventDefault();
        console.log(this.photofilename)
        this.photofilename=event.target.files[0].name;
        console.log(this.photofilename)
        console.log(this.imagesrc)
        const formData=new FormData();
        formData.append(
            //从 event.target.files 属性获取上传的文件信息。
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        console.log(event.target.files[0])

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc='http://localhost:65487/Photos/'+result;
            // this.imagesrc=process.env.REACT_APP_API2+result;
            console.log(this.imagesrc)
        },
        (error)=>{
            alert('Failed');
        }
        )
    }
    render(){
        return(
            <div className="container">
    <Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-model-title-vcenter"
    centered  
    >

        <Modal.Header closeButton>
            <Modal.Title id="contained-model-title-vcenter">
                Add Employee
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeName">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" name="EmployeeName" required
                        placeholder="EmployeeName"/>
                    </Form.Group>

                    <Form.Group controlId="Department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select">
                            {this.state.deps.map(dep=>
                                <option key={dep.DepartmentId}>
                                    {dep.DepartmentName}
                                </option>
                                )}
                        </Form.Control>    
                    </Form.Group>


                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining/"/>
                            
                    </Form.Group>

                    
                    <Form.Group>
                        <Button variant="primary" type='submit'>
                            Add Employee
                        </Button>
                    </Form.Group>
                    </Form>
                </Col>

                <Col sm={6}>
                    <Image width="200px" height="200px" src={this.imagesrc}/>
                    <input onChange={this.handleFileSelected}type="File"/>
                    
                </Col>
            </Row>
        </Modal.Body>



            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
    </Modal>

            </div>
        )
    }


}