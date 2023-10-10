import Button from "./Button";
import { useRemoveboardMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import { GoXCircle} from 'react-icons/go';

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
        List of photos in the board;
    </ExpandablePanel>
};

export default BoardsListItem;