import React from "react";
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import DefaultCardHeader from "./DefaultCardHeader";
import {Link} from "react-router";
import muiImg from "../../posts/151016/images/mui.jpg";
import "./style.css";

const BlogPostCard = ({title, subtitle, img, date}) =>
    <div className="CardContain">
        <Card>
            <DefaultCardHeader date={date} />
            <CardMedia overlay={<CardTitle title={<Link to={`/blog/${date}`}>{title}</Link>} subtitle={subtitle}/>}>
                <img src={muiImg} alt="React"/>
            </CardMedia>
        </Card>
    </div>;

BlogPostCard.propTypes = {
    title: React.PropTypes.node.isRequired,
    subtitle: React.PropTypes.string.isRequired,
    img: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
};

export default BlogPostCard;