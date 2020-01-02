import React, { Fragment } from 'react'
import { Card, Image, Button, Message, Loader, Label } from 'semantic-ui-react'
import StarRating from './StarRating'


class FavoriteBusiness extends React.Component {

    state = {
        business: null,
        error: null
    }

    componentDidMount() {
        this.fetchBusiness()
    }


    fetchBusiness = () => {
        fetch(`http://localhost:3000/api/v1/businesses/${this.props.favorite.business_id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    this.setState({ business: data })
                } else
                    this.setState({ error: data.error.description })
            })
    }

    render() {
        const { isFavorite, handleFavoriteClick } = this.props
        const { business } = this.state
        return (
            <Fragment>
                <Card className='business-card' style={{ width: '290px' }}>
                    {!!business ? <Fragment>

                        <Card.Content>
                            <Card.Header>{business.name}</Card.Header>
                            {/* <Image className='business-image' src={business.image_url} /> */}

                            <Card.Description>
                                {business.photos && business.photos.map((photo, index) => <Image key={index} src={photo} size="medium" className="favorite-image" />)}
                                <p>{business.location.display_address[0]} <br /> {business.location.display_address[1]} <br />{business.location.display_address[2]}</p>
                                <p>{business.display_phone}</p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <StarRating rating={business.rating} /> {" "}
                            <span>{business.price} </span>
                            <br /> <Button icon='like' size='tiny' toggle active={isFavorite} onClick={(e) => handleFavoriteClick(e, business)} />
                            {business.categories && business.categories.map((category, index) => <Label key={index}>{category.title}</Label>)}

                        </Card.Content></Fragment> : <Fragment>
                            {!!this.state.error && <Card.Content textAlign="left">
                                <Message error icon="exclamation triangle"
                                    content={this.state.error} /></Card.Content>}
                            <Loader active={!this.state.error} /></Fragment>}
                </Card >
            </Fragment>
        )
    }
}

export default FavoriteBusiness