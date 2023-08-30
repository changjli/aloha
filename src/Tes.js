const Tes = () => {
    const array = [1, 2, 3];

    const hello = () => {
        console.log(array);
        return array.map((e) => <div>hello world</div>)
    }

    return (
        <div>
            {hello()}
        </div>
    );
}

export default Tes;