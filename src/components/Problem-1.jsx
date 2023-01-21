import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');

    const [formValue, setFormValue] = useState({
        name: '',
        status: ''
    });
    const [list, setList] = useState([]);
    const [activeList, setActiveList] = useState([]);
    const [completedList, setCompletedList] = useState([]);

    const handleClick = (val) =>{
        setShow(val);
    }

    const formValueChange = (e) =>{
        setFormValue({...formValue, [e.target.name]: e.target.value});
    }

    const formSubmit = (e) =>{
        e.preventDefault();
        const status = formValue.status && formValue.status.toLowerCase();
        const listData = [...list, {name: formValue.name, status: status}];
        const statusOrder = {active: 0, completed: 1, pending: 2, archive: 3};

        const result = listData.sort(
            ({status: s1}, {status: s2}) => (statusOrder[s1] ?? Infinity) - (statusOrder[s2] ?? Infinity)
        );
        setList(result)

        if (status === 'active') {
            setActiveList([
                ...activeList,
                {name: formValue.name, status: status}
            ]);
        }

        if (status === 'completed') {
            setCompletedList([
                ...completedList,
                {name: formValue.name, status: status}
            ]);
        }
        
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={formSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" value={formValue.name} name="name" onInput={formValueChange}/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" value={formValue.status} name="status"onInput={formValueChange}/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {show==='all' ? list.map((l, index) => (
                                <tr key={index} >
                                    <td>{l.name}</td>
                                    <td>{l.status}</td>
                                </tr>
                        )) : show==='active' ? activeList.map((l, index) => (
                                <tr key={index} >
                                        <td>{l.name}</td>
                                        <td>{l.status}</td>
                                </tr>
                        )) : show==='completed' ? completedList.map((l, index) => (
                                <tr key={index} >
                                    <td>{l.name}</td>
                                    <td>{l.status}</td>
                                </tr>
                        )) : (
                            <span></span>
                        )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;