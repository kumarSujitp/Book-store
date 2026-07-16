import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const covers = [
  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
];

const BookCard=(props)=> {
    console.log('rrrrrrrrrrrrrrrrr',props)
    const{data}=props
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" />
       */}
  <Card.Img style={{width:"100%",height:"200px"}}
  variant="top"
  src={`https://picsum.photos/300/400?random=${data.id}`}
  alt={data.name}
/>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          Complete {data.name} is a practical guide for developers who want to build modern, fast, and scalable web applications using React.Its price is Rs.{data.price} and its ISBN number is {data.isbn}
        </Card.Text>
        <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;