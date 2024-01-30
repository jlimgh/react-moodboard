import { useDispatch, useSelector } from "react-redux";
import { changeName, addUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import Button from "./Button";

function AddUser() {
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
    const dispatch = useDispatch();
    const { name } = useSelector((state) => {
        return {
            name: state.form.name,
        }
    })
    const handleNameChange = (event) => {
        dispatch(changeName(event.target.value))
    }
    const handleSubmit = (event) => {
        //prevent sbumit and reload page
        event.preventDefault();
        doCreateUser({ name });

    }
    return <div className="user-form panel">
        <form className="inline-flex items-center" onSubmit={handleSubmit}>
            <div className="field-group">
                <div className="field">
                    <input 
                        className="input is-expanded py-1"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
            </div>
            <Button loading={isCreatingUser} style={{width: '120px'}}>
            + Add User
            </Button>
            { creatingUserError && 'Error creating user...'}
        </form>
    </div>;
}

export default AddUser;