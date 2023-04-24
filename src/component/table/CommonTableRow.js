import React from 'react';
import { useNavigate } from 'react-router';

const CommonTableRow = ({children}) => {
  const navigator = useNavigate();
 // console.log(children);
const test = (id) => {
  navigator(`/problem/${id}`);
   
}
  return (
    <tr className="common-table-row" onClick = {() => test(children[0].props.children)}>
      {
        children
      }
    </tr>
  )
}

export default CommonTableRow;