import React, { useEffect, useState } from 'react'
import { useFireBase } from '../../../shared/context/FireBaseContext'
import { Col, Container, Row } from 'react-bootstrap';
import BookCard from '../../book/components/BookCard';

function HomePage() {
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
    <div className='container-fluid mt-3 p-4'>
  <Row>
    {books?.map((item) => (
      <Col 
        key={item.id}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="mb-4"
      >
        <BookCard data={item} />
      </Col>
    ))}
  </Row>
</div>
  )
}

export default HomePage;
