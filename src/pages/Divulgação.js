import { API_URL } from "../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Divulgação = () => {
    const [pages, setPages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [featuredId, setFeaturedId] = useState();

    useEffect(() => {
        fetch(API_URL + "/pages?slug=divulgacao")
        .then((response) => response.json())
        .then((data) => {
            setPages(data);
        });
    }, []);

    const fetchProjects = async () => {
        await fetch(API_URL + `/project`)
          .then((response) => response.json())
          .then((result) => {
            setProjects(result);
          });
      };

      const fetchFeaturedId = async () => {
        await fetch(API_URL + `/project/`)
          .then((response) => response.json())
          .then((result) => {
            setProjects(result);
          });
      };

      useEffect(() => {
        fetchProjects();
      }, []);


    return (
        <>
            <Header />
            <div className="conteudos">
                <div
                    dangerouslySetInnerHTML={{ __html: pages[0]?.content?.rendered }}
                ></div>
                <ul>
                    {projects.map((project) => (
                       <li className="project" key={project.id}>
                            <img src={" "} />
                            {project?.title?.rendered}
                        </li>
                     ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default Divulgação;