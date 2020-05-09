import React from 'react';
import './styles';
import  {todosRef} from '../../firebase';
class ChantComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {data: [],msg:''};
    }
    componentDidMount() {
        todosRef.on("value", snapshot => {
                let data = [];
                if(snapshot.val() != null)
                   data.push(snapshot.val());
                
                 this.setState({data})
           });
    }
      deleteMsg = _id => {
        todosRef.child(_id).remove();
      };
      submitText = () => {
        const {msg} = this.state;
        todosRef.push().set({val : msg});
        this.setState({msg:''})
      };
      textChange = (e) => {
          
          this.setState({msg:e.target.value})
      }
    render() {
        
        const{data, msg} = this.state;
           console.log(data);
            return (
                <div className="App">
               <div key="toDoName">
                   <input type="text" value={msg} onChange={(e) =>this.textChange(e)}/> <input type="button" value="Send" onClick={this.submitText}/>
                    {data.length>0 && Object.keys(data[0]).map(item => { return ( 
                        <h4 key={item}>{data[0][item].val}<span onClick={() => this.deleteMsg(item)}>
                            <i>(X)</i>
                        </span>
                      </h4>
                       
                    )})
                    }
                    </div>
                </div>
            );
    }
}
export default ChantComponent;
