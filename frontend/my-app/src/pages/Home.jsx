import React from 'react';
import Calendar from '../components/Calendar';

export default function Home() {
  return (
    <div className="container vh-100 d-flex flex-column align-items-center justify-content-center">
      <a href="/newDiary" className="btn btn-primary mb-3" role="button">
        일기 작성하기
      </a>
      <Calendar />
    </div>
  )
  // happy, soso , bad, melancholy,
  // 노란색, 회색, 빨간색, 파란색 #5442f5
}
