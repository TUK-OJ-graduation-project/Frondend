import React, { useState, useEffect, FaAngleDown } from 'react';
// import axios from 'axios';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import CommonTable from '../table/CommonTable';
import CommonTableColumn from '../table/CommonTableColumn';
import CommonTableRow from '../table/CommonTableRow';
import ReactDOM from 'react-dom';
import './Post.css';
import postList from '../../problemdata';
import Dropdown from '../Dropdown.jsx';
import Dropdown1 from '../Dropdown1.jsx';
import Dropdown2 from '../Dropdown2.jsx';
import {View} from 'react-native';


const PostList = props => {
  const [ dataList, setDataList ] = useState([]);
  useEffect(() => {
    setDataList(postList);
  }, [ ])

  //newDropdown

  //dropdown
  const [view, setView] = useState(false); 
  const [selected, setSelected] = useState("");
  return (
    <>
    {/* <Wrapper> */}
   
      <div className="pagename"><h1 style={{ color: "grey", marginLeft: 150 }}>PROBLEM LIST</h1></div>
      {/* dropdown */}
      {/* <button style={{fontSize: 15, alignItems: "center"}}>
        <ul onClick={() => {setView(!view)}}>  
          level{" "}
          {view ? '⌃' : '⌄'}
          {view && <Dropdown />} 
        </ul>
      </button> */}
      {/* <Dropdownbutton>
      <div class="dropdown">
        <div class="select">
          <span class="selected">LEVEL</span>
          <div class="caret"></div>
        </div>
        <ul class="menu">
          <li>Lv 1</li>
          <li>Lv 2</li>
          <li>Lv 3</li>
          <li>Lv 4</li>
          <li>Lv 5</li>
        </ul>
      </div>
      <div class="dropdown">
        <div class="select">
          <span class="selected">언어</span>
          <div class="caret"></div>
        </div>
        <ul class="menu">
          <li>c</li>
          <li>c++</li>
          <li>java</li>
          <li>python</li>
        </ul>
      </div>
      </Dropdownbutton> */}
      <View style={{flex: 1, float: "right"}}>
            <Dropdown2 selected={selected} setSelected={setSelected}/>
      </View>
    <div style={{background: "#000066", marginLeft: 150, marginRight: 150, borderRadius: 10}}>
        <CommonTable headersName={['ID', '문제명',
        <Dropdown  selected={selected} setSelected={setSelected}/>,
        <Dropdown1 selected={selected} setSelected={setSelected}/>
        ]}>
            {
            dataList && dataList.map((item, index) => {
                return (
                <CommonTableRow key={index}>
                    <CommonTableColumn>{ item.id }</CommonTableColumn>
                    <CommonTableColumn>{ item.title }</CommonTableColumn>
                    <CommonTableColumn>{ item.level }</CommonTableColumn>
                    
                </CommonTableRow>
                )
            }) 
            }
        </CommonTable>
    </div>
    {/* </Wrapper> */}
    </>
    
  )
};

export default PostList;
