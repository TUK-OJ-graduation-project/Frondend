import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from './signature.png';
import { links, social } from './data';
import './header.css';


const Headerbar = () => {
  const [showSocial, setShowSocial] = useState(false); // 변수명 수정
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);


  const toggleLinks = () => {
    linksContainerRef.current.classList.toggle('show-links');
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    const containerHeight = linksContainerRef.current.getBoundingClientRect().height;
    if (containerHeight === 0) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = 0;
    }
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showSocial) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = 0;
    }
  }, [showSocial]);

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          {/* 로고 클릭시 "/" 경로로 이동 */}
          <Link to="/">
            <img src={logo} className='logo' alt='logo' />
          </Link>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        {/* 메뉴버튼 클릭시 목록 보이도록 */}
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {/* data에서 Nav목록 가져오기 */}
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social 아이콘 가져오기 */}
        <ul className='social-icons'>
  {social.map((socialIcon) => {
    const { id, url, icon, text } = socialIcon;
    return (
      <li key={id}>
        <a href={url} onClick={() => setShowSocial(id)}>
          {icon}
          {/* {showSocial === id && (
          <ul className='social-list'>
            <li>
              <button>{text}</button>
            </li>
            <li>
              <button>{text}</button>
            </li>
            <li>
              <button>{text}</button>
            </li>
          </ul>
        )} */}
        <button>{text}</button>
        </a>

      </li>
    );
  })}
</ul>

      </div>
    </nav>
  );
}
  export default Headerbar;
