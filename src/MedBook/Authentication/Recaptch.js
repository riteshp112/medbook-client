// @ts-nocheck
import * as React from 'react';
import { View, StyleSheet, Platform, Modal, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import RecaptchaWeb from 'react-grecaptcha';

const siteKey = '6LcwpW0iAAAAANfdOZ2FZv2rfO8zunpbSNwBtnIX';
const baseUrl = 'https://medbook.netlify.app';

export default class Recaptcha extends React.Component {
    state = {
        code: null,
        isModalVisible: false
    };
    onMessage = event => {
        const { onSucess, onFail } = this.props;
        if (event && event.nativeEvent.data) {
            if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
                onFail && onFail();
                this.captchaForm.hide();
                return;
            } else {
                this.setState({ code: event.nativeEvent.data });
                setTimeout(() => {
                    this.captchaForm.hide();
                    onSucess && onSucess()
                }, 1500);
            }
        }
    };

    render() {
        const { Footer, onSucess, onFail } = this.props;

        return (
            <View>
                {
                    Platform.OS == 'web' ?
                        <><Modal visible={this.state.isModalVisible} transparent={true}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(1,1,1,0.8)', alignItems: 'center' }}>
                                <RecaptchaWeb
                                    sitekey={siteKey}
                                    callback={() => {
                                        this.setState({ isModalVisible: false })
                                        onSucess && onSucess()
                                    }}
                                    expiredCallback={onFail}
                                    locale="en"
                                    style={{ paddingTop: 100 }}
                                />
                                <Pressable style={{ backgroundColor: 'darkred', paddingHorizontal: 24, paddingVertical: 8, borderRadius: 12, marginTop: 8 }}
                                    onPress={() => {
                                        onFail && onFail();
                                        this.setState({ isModalVisible: false })
                                    }}>
                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                </Pressable>
                            </View>
                        </Modal>
                            {Footer ? <Footer onPress={() => {
                                this.setState({ isModalVisible: true })
                            }}></Footer> : void 0}
                        </>
                        : <><ConfirmGoogleCaptcha
                            ref={_ref => (this.captchaForm = _ref)}
                            siteKey={siteKey}
                            baseUrl={baseUrl}
                            languageCode="en"
                            onMessage={this.onMessage}
                        />
                            {Footer ? <Footer onPress={() => {
                                this.captchaForm.show();
                            }}></Footer> : void 0}
                        </>
                }
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
