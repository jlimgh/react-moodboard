import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from "./UsersListItem";
import AddUser from "./AddUser";

function UsersList() {
    //state inside component method
    // const dispatch = useDispatch();
    // const { name } = useSelector((state) => {
    //     return {
    //         name: state.form.name,
    //     }
    // })
    // const handleNameChange = (event) => {
    //     dispatch(changeName(event.target.value))
    // }
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    // const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    })

    useEffect(() => {
       doFetchUsers();
    }, [doFetchUsers])


    // const handleAddUser = () => {
    //     doCreateUser({ name });
    // }  

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data....</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user}/>
        });
    }

    return <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">
                Users
            </h1>
            <AddUser />
        </div>
        <div>{content}</div>
    </div>;
}

export default UsersList;