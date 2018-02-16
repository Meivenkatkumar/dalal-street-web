import * as React from "react";
import { Metadata } from "grpc-web-client";
import { Notification as Notification_pb } from "../../../proto_build/models/Notification_pb";
import { Notification } from "../common/Notification";
import { StockBriefInfo } from "../trading_terminal/TradingTerminal";
import { SearchBar } from "../trading_terminal/SearchBar";
import { CompanyDetails } from "./CompanyDetails";

export interface CompanyProps {
    sessionMd: Metadata,
    notifications: Notification_pb[],
    stockBriefInfoMap: { [index:number]: StockBriefInfo },
    stockPricesMap: { [index:number]: number },
    disclaimerElement: JSX.Element
}

interface CompanyState {
    currentStockId: number,
    currentPrice: number,
}

export class Company extends React.Component<CompanyProps, CompanyState> {
    constructor(props: CompanyProps) {
        super(props);

        const currentStockId = Number(Object.keys(this.props.stockBriefInfoMap).sort()[0])
        this.state = {
            currentStockId: currentStockId,
            currentPrice: props.stockPricesMap[currentStockId],
        };
    }

    componentDidMount() {

    }

    // child will affect the current stock id
    handleStockIdChange = (newStockId: number) => {
        this.setState({
            currentStockId: newStockId,
            currentPrice: this.props.stockPricesMap[newStockId],
        });
    };

    render () {
        return (
            <div id="company-details" className="main-container ui stackable grid pusher">
                <div className="row" id="top_bar">
                    <div id="search-bar">
                        <SearchBar
                            stockBriefInfoMap={this.props.stockBriefInfoMap}
                            stockPricesMap={this.props.stockPricesMap}
                            handleStockIdCallback={this.handleStockIdChange}
                            defaultStock={this.state.currentStockId} />
                    </div>
                    <div id="current-price-container" className="left floated">
                        <b>Current price: {this.state.currentPrice}</b>
                    </div>

                    <div id="notif-component">
                        <Notification notifications={this.props.notifications} icon={"open envelope icon"} />
                    </div>
                </div>

                <CompanyDetails
                    sessionMd={this.props.sessionMd}
                    currentStockId={this.state.currentStockId}
                    currentPrice={this.state.currentPrice}
                />
                {this.props.disclaimerElement}
            </div>
        );
    }
}