import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  AiOutlineStar,
  AiOutlineBarChart,
  AiOutlineBook,
} from "react-icons/ai";
import { IconContext } from "react-icons";

import atomicImg from '../../svgs/atomicImg.jpg';
import deepImg from '../../svgs/deepImg.jpg'

import "../styles/Recommendations.scss";

const Recommendations = ({auth: { isAuthenticated, loading }}) => {

// App Recs
  const apps = [
    {
      key: 1,
      logo: <AiOutlineBarChart />,
      name: "Increaser",
      for: "Productivity App",
      bg: "#defcfc",
      iconColor: "#a6e3e9",
      link: "https://increaser.org/"
    },
    {
      key: 2,
      logo: <AiOutlineStar />,
      name: "Anki",
      for: "Memorizing Study Tool",
      bg: "#ffffc5",
      iconColor: "#f0dd92",
      link: "https://apps.ankiweb.net/"
    },
    {
      key: 3,
      logo: <AiOutlineBook />,
      name: "Grow Daily Journal",
      for: "Habit Tracking Assistant",
      bg: "#e8ffff",
      iconColor: "#41aea9",
      link: "https://www.baronfig.com/tools/confidant/guided"
    },
  ];
  
  // Book Recs
  const books = [
      {
        key: 1,
        title: "Atomic Habits",
        author: "James Clear",
        des: "With over 1 million copies sold internationally, Atomic Habits surfaces the truth of habits to help break bad ones and develop good ones.",
        img: atomicImg,
        link: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=sr_1_1?dchild=1&keywords=atomic+habits&qid=1601667012&sr=8-1"
      },
      {
        key: 2,
        title: "Deep Work",
        author: "Cal Newport",
        des: "One of the most valuable skills in our economy is becoming increasingly rare. Deep Work is an indispensable guide to anyone seeking focused success in a distracted world.",
        img: deepImg,
        link: "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692/ref=sr_1_1?dchild=1&keywords=deep+work&qid=1601667024&sr=8-1"
      }
  ]
  return (
      <Fragment >
    {!loading & isAuthenticated ? <div className="recommendations">
      <div className="apps">
        <div className="title"><span>Tools</span> for <span>Success</span></div>
        <div className="apps_container">
          {apps.map((app) => {
            return (
              <a className="app_card" key={app.key} href={app.link} target='_blank' rel='noopener noreferrer'>
                <div className="logo" style={{ backgroundColor: app.bg }}>
                  <IconContext.Provider value={{ className: "icon", style: {color: app.iconColor} }}>
                    {app.logo}  
                  </IconContext.Provider>
                </div>
                <div className="content">
                  <h2>{app.for}</h2>
                  <h3>{app.name}</h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="books">
          <div className='title'>
              <span>Books</span> for <span>You</span>
          </div>

          <div className='books_container'>
              {books.map((book) => {
                  return (
                      <a className='book_card' key={book.key} href={book.link} target='_blank' rel='noopener noreferrer'>
                          <div className='content'>
                            <h2>{book.title} <span>- {book.author}</span></h2>
                            <h3>{book.des}</h3>
                          </div>
                          <img src={book.img} alt={book.title} />
                      </a>
                  )
              })}
          </div>
      </div>
    </div>: null}
    </Fragment>
  );
};


Recommendations.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Recommendations);
