import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BooksStatus from './BooksStatus/BooksStatus';
import BooksProgress from './BooksProgress/BooksProgress';
import {
  fetchBooks, removeFromApi, clearBookList, removeBook,
}
  from '../../redux/books/books';
import {
  BookDivLeft, Category, Title, ButtonsContainer, BooksButton, BookWrapper,
} from './BooksElements';

const Books = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    return () => {
      dispatch(clearBookList());
    };
  }, []);

  const removeBookFromStore = (e) => {
    const bookId = e.target.id;
    dispatch(removeFromApi(bookId));
    dispatch(removeBook(bookId));
  };
  const books = useSelector((state) => state.booksReducer);
  const renderBooks = books.map((book) => (

    <BookWrapper key={book.item_id}>
      <BookDivLeft>
        <Category>{book.category}</Category>
        <Title>{book.title}</Title>
        <ButtonsContainer>
          <BooksButton className="firstBtn">Comments</BooksButton>
          <BooksButton id={book.item_id} onClick={removeBookFromStore}>Remove</BooksButton>
          <BooksButton className="lastBtn">Edit</BooksButton>
        </ButtonsContainer>
      </BookDivLeft>
      <BooksStatus percentage={`${Math.floor(Math.random() * 100).toString()}%`} status="Completed" />
      <BooksProgress currentChapter="CURRENT CHAPTER" chapter={`CHAPTER ${Math.floor(Math.random() * 30).toString()}`} />
    </BookWrapper>
  ));

  return (
    <>{renderBooks}</>
  );
};

export default Books;
