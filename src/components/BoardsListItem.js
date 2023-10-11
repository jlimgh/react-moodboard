import Button from "./Button";
import { useRemoveboardMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import { GoXCircle} from 'react-icons/go';
import PhotosList from "./PhotosList";

function BoardsListItem ({ board }) {
    const [removeBoard, results] = useRemoveboardMutation();

    const handleRemoveBoard = () => {
        removeBoard(board);
    }
    const header = (
        <>
            <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveBoard}>
                <GoXCircle />
            </Button>
            {board.title}
        </>
    )

    return <ExpandablePanel key={board.id} header={header}>
        <PhotosList board={board}/>
    </ExpandablePanel>
};

export default BoardsListItem;