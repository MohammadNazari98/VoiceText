const ViewText = (props) => {
    return (
        <>
        <h2 className="h2 my-3 text-primary">نمایش متن</h2>
        <div className="border rounded w-100 h-50">
            <p className="text-break px-2 py-4 text-color">
                {props.newText}
            </p>
        </div>
        </>
    );
};

export default ViewText;
