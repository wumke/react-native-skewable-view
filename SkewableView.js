import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableHighlight, ListView, Image, Dimensions, RefreshControl, ScrollView, AppState, Alert } from 'react-native';

export default class SkewableView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let renderable = true;
        let additionalAngle = 0;
        if (this.props.skewDirection=='horizontal-right' || this.props.skewDirection=='horizontal-left') {
            additionalAngle = -90;
        }

        let angleMultiplier = 1;
        if (this.props.skewDirection=='vertical-top' || this.props.skewDirection=='horizontal-left') {
            angleMultiplier = -1;
        }

        let innerHeight = 0;
        let innerWidth = 0;
        let translateX = 0;
        let translateY = 0;
        let angleDeg = 0;
        if (this.props.skewDirection=='vertical-top' || this.props.skewDirection=='vertical-bottom' || this.props.skewDirection=='horizontal-right' || this.props.skewDirection=='horizontal-left') {
            if (this.props.skewDirection=='horizontal-right' || this.props.skewDirection=='horizontal-left') {
                //horizontal skew
                innerHeight = this.props.boundingBoxWidth;
                innerWidth = this.props.boundingBoxHeight*2;
            } else if (this.props.skewDirection=='vertical-top' || this.props.skewDirection=='vertical-bottom') {
                //vertical skew
                innerHeight = this.props.boundingBoxHeight;
                innerWidth = this.props.boundingBoxWidth*2;
            }
            let angleRad = 0;
            if(this.props.skewUnits=='rad' || this.props.skewUnits=='px') {
                if(this.props.skewUnits == 'px') {
                    if (this.props.skewDirection=='horizontal-right' || this.props.skewDirection=='horizontal-left') {
                        //horizontal skew
                        angleRad = Math.atan(this.props.skewValue / this.props.boundingBoxHeight);
                    } else if (this.props.skewDirection=='vertical-top' || this.props.skewDirection=='vertical-bottom') {
                        //vertical skew
                        angleRad = Math.atan(this.props.skewValue / this.props.boundingBoxWidth);
                    }
                }
                else {
                    angleRad = this.props.skewValue;
                }

                angleDeg = angleRad * 180 / Math.PI;
                angleDeg = Math.floor(angleDeg);
                angleDeg *= angleMultiplier;
            } else if(this.props.skewUnits == 'deg'){
                angleDeg = this.props.skewValue;
                angleRad = angleDeg * Math.PI/180;
                angleDeg = Math.floor(angleDeg);
                angleDeg *= angleMultiplier;
            } else {
                renderable = false;
            }
            innerMaxHeight = innerHeight;
            console.log('>>>> >>>> >>>> radang: ' + angleRad);
            console.log('>>>> >>>> >>>> cos: ' + Math.cos(angleRad));
            innerHeight = innerHeight * Math.cos(angleRad) - innerWidth/2 * Math.tan(angleRad)
            innerHeight = Math.floor(innerHeight);
            translateX = -(innerWidth-this.props.boundingBoxWidth)/2;
            translateY = (this.props.boundingBoxHeight-innerHeight)/2;
        }
        else {
            renderable = false;
        }
        
        // console.log('angle: ' + angleDeg);
        // console.log('innerwidth: ' + innerWidth);
        // console.log('innerheight: ' + innerHeight);
        // console.log('boundingwidth: ' + this.props.boundingBoxWidth);
        // console.log('boundingheight: ' + this.props.boundingBoxHeight);
        // console.log('translateX: ' + translateX);
        // console.log('translateY: ' + translateY);
        
        if(renderable) {//example is vertical skew!
            return (
                <View style={[this.props.style, {overflow: 'hidden', width:this.props.boundingBoxWidth, height:this.props.boundingBoxHeight}]}>
                    <View style={{
                        alignSelf: 'stretch',
                        width:innerWidth,
                        height:innerHeight,
                        transform:[{translateX:translateX}, {translateY:translateY}, { rotateZ: angleDeg+additionalAngle + 'deg' }],
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            height: this.props.boundingBoxHeight,
                            alignSelf: 'stretch',
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ScrollView style={{
                                height: this.props.boundingBoxHeight,
                                transform:[{ rotateZ: -1*(angleDeg+additionalAngle) + 'deg' }],
                                width:this.props.boundingBoxWidth,
                                backgroundColor: this.props.backgroundColor,
                            }}>
                                {this.props.children}
                            </ScrollView>
                        </View>
                    </View>
                </View>

            );
        }
        else {
            return (
                <View>
                    <Text>Could not render SkewableView</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

});