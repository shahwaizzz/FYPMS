import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../../../components/progressbar";
import { supervisorsUrl, students } from "../../../apis";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
export default function Meetings() {
  return (
    <Container>
      <Row>
        <Col>Mon 18</Col>
        <Col>Project Name</Col>
        <Col>Meeting Name</Col>
        <Col>Meeting Location</Col>
        <Col>Meeting Duration</Col>
      </Row>
    </Container>
  );
}
