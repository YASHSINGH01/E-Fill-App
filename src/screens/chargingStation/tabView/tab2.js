import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Dimensions } from 'react-native'
//Library
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { showMessage } from "react-native-flash-message";
import {
    Avatar
} from "react-native-paper"
//Api
import HttpRequest from "../../../utils/HTTPRequest";
//Redux
import { connect } from 'react-redux';
import { reviewsList } from '../../../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';
// Theme Colors
import COLORS from "../../../constants/colors";
import { Images } from '../../../constants';
import { strings } from "../../../utils/translations";


class tab2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            reviewData: '',
            isAdded: false,
        };
    }

    componentDidMount = () => {
        this.getAllReviews();
    }

    getAllReviews = () => {
        let { data } = this.props;
        if(data.id != undefined) {
            HttpRequest.getChargingStationReviews({ id: data.id }, this.props.token)
            .then(res => {
                this.setState({ isLoading: false });
                const result = res.data;
                if (res.status == 200 && !result.error) {
                    // console.log("Reviews List API Response Tab 2 ---------- ", result.data);
                    this.props.reviewsList(result.data);
                    this.setState({ isAdded: result.isAdded, refreshing: false });
                    //  console.log("Reviews List API Response ---------- ", this.props.reviews_list);
                } else {
                    console.log("Reviews List API Error : ",result);
                    this.setState({refreshing: false });
                    this.props.reviewsList('');
                    // showMessage({
                    //    message: strings.error.title,
                    //     description: result.message != undefined ? result.message : result.status,
                    //     type: "danger",
                    // });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log("Reviews List API Catch Exception: ",err);
                showMessage({
                    message: strings.error.title,
                    description: strings.error.message,
                    type: "danger",
                });
            });
        }
    }

    onRefresh = () => {
        this.setState({ refreshing : true})
        this.getAllReviews();
    }

    // Delete Added Review Through Api
    deleteReview = (id) => {
        let { reviews_list } = this.props;
        reviews_list = reviews_list.filter((item) => item.id !== id);
        HttpRequest.removeReview({review_id: id }, this.props.token)
        .then(res => {
            this.setState({ isLoading: false });
            const result = res.data;
            if (res.status == 200 && !result.error) {
                    // console.log("Delete Added Review API Response ---------- ", result);
                    this.setState({ reviewData: reviews_list, isAdded: false});
                    this.props.reviewsList(reviews_list);
                    showMessage({
                        message: strings.success.title,
                        description: strings.success.reviewDeleted,
                        type: "success",
                    });
            } else {
                //console.log("Delete Added Review API Error : ",result);
                showMessage({
                   message: strings.error.title,
                    description: result.message != undefined ? result.message : result.status,
                    type: "danger",
                });
            }
        })
        .catch(err => {
            this.setState({ isLoading: false });
            //console.log("Delete Added Review API Catch Exception: ",err);
            showMessage({
                message: strings.error.title,
                description: strings.error.message,
                type: "danger",
            });
        });
    }

    checkImageURL = (url) => {
        fetch(url)
           .then(res => {
            if(res.status == 404){
                this.setState({ profile_image: Images.userIcon});
            }else{
                this.setState({ profile_image: { uri: res.url }});
            }
        })
        .catch(err=>{
            this.setState({ profile_image: Images.userIcon});
        });
    }

    onError(error){
        this.setState({ profile_image: Images.userIcon})
    }

    renderItem = ({ item }) => (
        <View style={[styles.item, item.isCurrent ? styles.active : null]}>
            <View style={styles.itemHeader}>
                {/* Charging Station Image & Ratings */}
                <View style={styles.row}>
                    {/* <Image source={{uri: item.avtar_url}} style={styles.image}/> */}
                    <Avatar.Image 
                        source={ Images.userIcon }
                        style={{ backgroundColor: '#113C60'}}
                    />
                    <View style={styles.content}>
                        <View style={[styles.row, { justifyContent: 'space-between'}]}>
                            <Text style={[styles.text, styles.title]}>{item.name}</Text>
                            { item.rating != "No rating yet" ?
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={parseInt(item.rating)}
                                fullStarColor={'#5dda96'}
                                emptyStarColor={'#fff'}
                                starSize={18}
                                starStyle={{ alignSelf: 'flex-end' }}
                            /> : null }
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text,styles.description]}>{item.created_at}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.footerContent}>
                        <Text style={[styles.text,styles.description]}>{item.review}</Text>
                        {item.isCurrent ? 
                        <TouchableOpacity style={styles.trashIconContainer} onPress={()=> this.deleteReview(item.id)}>
                            <Icon name="ios-trash" size={22} color="#F44336" />
                        </TouchableOpacity>
                        : null }
                    </View>
                </View>
            </View>
           
        </View>
    );

    renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>{strings.chargingStationDetails.existingReviews}</Text>
            { this.state.isAdded == false ?
            <TouchableOpacity style={styles.modalButton} onPress={()=> this.props.navigation.navigate('AddReviews', { id: this.props.data.id})} >
                <Icon name="ios-add-circle" size={20} color="#fff" style={styles.icon}/>
                <Text style={styles.modalText}>{strings.chargingStationDetails.reviews.title}</Text>
            </TouchableOpacity>:
            null}
        </View>
    )

    listEmptyComponent = () => (
        <View style={styles.noDataFoundContainer}>
            <Text style={styles.noDataFoundText}>{strings.chargingStationDetails.reviews.notFound}</Text>
        </View>
    )
  
    render() {
        let { refreshing } = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.footer}>
                    <FlatList
                        data={this.props.reviews_list}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id+''}
                        ListHeaderComponent={this.renderHeader}
                        ListEmptyComponent={() => this.listEmptyComponent()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={'#fff'}/>
                        }
                    />
                </View>
            </View>
        )
    }
}  

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-start', 
        marginHorizontal: 20
    },
    header: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingVertical: 10, 
        borderBottomColor :'#fff', 
        borderBottomWidth: 1,
    },
    footer: {
        flex: 1,
        width: '100%',
        paddingBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 10,
    },
    modalButton: {
        flexDirection: 'row',
        justifyContent:'center', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.DEFAULT,
        padding: 5,
        borderRadius: 5
    }, 
    icon: {
        alignSelf: 'center'
    },
    modalText: {
        color: COLORS.DEFAULT,
        fontSize: 12,
        fontFamily: "Poppins-medium",
        textAlign: 'center',
        marginLeft: 5
    },
    headerText: {
        color: COLORS.DEFAULT,
        fontSize: 16,
        fontFamily: "Poppins-medium",
        textAlign: 'center',
        fontWeight: '700'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_BACKGROUND,
        padding: 20,
        marginVertical: 8,
        borderRadius: 20,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 25
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    footerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 5,
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    description: {
        flex: 1,
        fontSize: 11,
        color: COLORS.DEFAULT,
        textAlign: 'justify'
    },
    createdAt: {
        fontSize: 10,
        color: COLORS.DEFAULT,
        fontWeight: '400'
    },
    text: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
      
    }, 
    signInButton: {
        width: screenWidth/3.5 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT,
        fontFamily: "Poppins-Regular",
        color: 'black',
    },
    buttonText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: "Poppins-Regular",
    },
    trashIconContainer: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    active: {
        borderColor: COLORS.DEFAULT,
        borderWidth: 1
    },
    noDataFoundContainer: {
        flex: 1,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFoundText: {
        color: COLORS.DEFAULT,
        fontSize: 14,
        fontFamily: "Poppins-medium",
    }
    
});

const mapStateToProps = state => {
    return {
        token: state.token,
        reviews_list: state.reviews_list
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        reviewsList: bindActionCreators(reviewsList, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(tab2);