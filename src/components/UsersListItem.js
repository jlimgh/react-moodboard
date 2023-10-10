import { GoXCircle} from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import BoardsList from './BoardsList';

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = <>
        <Button className="mr-3" loading={isLoading} onClick={handleClick}>
            <GoXCircle />
        </Button>
        {error && <div>Error delteing user</div>}
        {user.name}
    </>;

    return (
        <ExpandablePanel header={header}>
            <BoardsList user={user}/>
        </ExpandablePanel>
    );
}

export default UsersListItem;