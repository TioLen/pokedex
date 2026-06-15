import Item from "./Item";
function List({list}){
  return(

    <ul>
      {list.map(function(item){
        return <Item key={item.id} item={item}/>
      })}
    </ul>
  );
}
export default List;
