import { useFetchBoardsQuery, useAddBoardMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import BoardsListItem from "./BoardsListItem";

function BoardsList({ user}) {
    //results obj
    //kind of like useEffect - it makes a request only one time
    const { data, error, isFetching } = useFetchBoardsQuery(user);
    const [addBoard, results] = useAddBoardMutation();

    const handleAddBoard = () => {
        addBoard(user);
    }

    let content;
    if (isFetching) {
        content = <Skeleton times={3} className="h-10 w-full" />
    } else if (error) {
        content = <div>Error laoding boards</div>
    } else {
        content = data.map(board => {
            return <BoardsListItem key={board.id} board={board} />;
        })
    }

    return <div>
        <div className="m-2 flex flow-row items-center justify-between">
            <h3 className="text-lg font-bold">Mood boards for {user.name}</h3>
            <Button loading={results.isLoading} onClick={handleAddBoard}>
                + Add Board
            </Button>
        </div>
        <div>
            {content}
        </div>
    </div>
};

export default BoardsList;