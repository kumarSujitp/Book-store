import React, { useEffect, useState } from 'react'
import BookCard from './BookCard'
import { useFireBase } from '../../../shared/context/FireBaseContext'
import { Col, Container, Row } from 'react-bootstrap';

function Home() {
    const[books,setBooks]=useState([])
    const {fetchBooks}=useFireBase();
    console.log('fetch',fetchBooks())

      const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };


    useEffect(()=>{
        loadBooks();
    },[])

    console.log(books)

  return (
    <Container className='mt-3'>
  <Row>
    {books?.map((item) => (
      <Col 
        key={item.id}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="mb-4 ml-3"
      >
        <BookCard data={item} />
      </Col>
    ))}
  </Row>
</Container>
  )
}

export default Home
