import React from "react";

class StarRating extends React.Component {
  starFile = () => {
    let fileName = Math.floor(this.props.rating);
    if (this.props.rating.toString().includes(".5")) fileName += "_half";
    return fileName;
  };

  render() {
    return (
      <img
        src={require("../yelp_stars/web_and_ios/large/large_" +
          this.starFile() +
          ".png")}
      ></img>
    );
  }
}

export default StarRating;
