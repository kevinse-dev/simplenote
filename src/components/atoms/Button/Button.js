
export default function Button({title, onclick, loading}) {
    if(loading){
        return <button className='btn disable'>
        loading ...
        </button>
    }
    return (
        <div>
        <button className='btn' onClick={onclick}>
        {title}
        </button>
        </div>
    )
}
