function Item({ item }) {
  return (
    <li key={item.id} className="pokemon-item">
      <div style={{height: '96px', width: '96px', display: 'flex'}}>
        <img src={item.imageUrl} alt={item.name}
        style={{objectFit: 'contain', textAlign: 'center', maxWidth: '96px', maxHeight: '96px', imageRendering: 'pixelated'}} />
      </div>
        <span>
          <a href={item.url}>
            {item.name}
          </a>
        </span>
        <span>ID: {item.id}</span>
      
      <br/>

    </li>
  );
}

export default Item;