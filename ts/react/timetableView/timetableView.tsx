import Button from "material-ui/Button";
import * as React from "react";
import * as ReactGridLayout from "../../modified_node_modules/react-grid-layout";
import {TimePeriod} from "../../att/timePeriod";
import {RawSlot} from "../../model/rawSlot";
import { CreateSlotViewModels, ISlotViewModel } from "../../model/slotViewModel";
import {STCBox} from "../../model/states/stcBox";
import {Timetable} from "../../model/timetable";
import {Colors} from "../colors/colors";
import {StackPanel} from "../panels/stackPanel";
import {TimetableSummaryView} from "../timetableSummaryView";
import { GenerateAlternateSlotViewsAndDayColumn } from "./generateAlternateSlotViewsAndDayColumn";
import {GenerateSlotViewsAndDayColumn} from "./generateSlotViewsAndDayColumn";
import {GenerateStateViews} from "./generateStateView";
import {ISkeleton, Skeleton} from "./skeleton";

const getTimetableViewWidth = () => 0.9 * window.innerWidth;

interface ITimetableViewProps {
    slots : ISlotViewModel[];
    states : STCBox[];
    alternateSlots: ISlotViewModel[];
    handleSetTimeContraintAt?: (state : STCBox) => void;
    handleDesetTimeContraintAt?: (state : STCBox) => void;
    handleToggleIsOpenOfSummary?: () => void;
    handleSelectSlotChoice:      (slotUid: number, newSlotChoice: number) => void;
    handleShowAlternateSlot:      (s: ISlotViewModel) => void;
    handleGoToThisAlternateSlot:  (slotUid: number) => void;
    isSummaryOpen?: boolean;
}

interface ITimetableViewState {
    width: number;
}

export class TimetableView extends React.Component < ITimetableViewProps, ITimetableViewState> {
    public constructor(props : ITimetableViewProps) {
        super(props);
        window.onresize = this.handleWindowResizing;
        this.state = {
            width: getTimetableViewWidth(),
        };
    }
    public render() {
        const skeleton = new Skeleton();
        if (this.props.slots) {
            const slotViewsAndDayColumn = GenerateSlotViewsAndDayColumn(
                this.props.slots.concat(this.props.alternateSlots),
                this.props.handleSelectSlotChoice,
                this.props.handleGoToThisAlternateSlot,
                this.props.handleShowAlternateSlot
                );
            skeleton.Concat(slotViewsAndDayColumn);
            const horizontalDividers = GenerateHorizontalDividers(skeleton);
            skeleton.Concat(horizontalDividers);
        }
        if (this.props.states) {
            const stateViews = GenerateStateViews(this.props.states, this.props.handleSetTimeContraintAt, this.props.handleDesetTimeContraintAt);
            skeleton.Concat(stateViews);
            skeleton.Layouts = skeleton
                .Layouts
                .concat(GetStandardDayColumnLayout());
        }
        const divStyle : React.CSSProperties = {
            backgroundColor: Colors.WhiteSmoke,
            borderStyle:     "solid",
            fontFamily:      "roboto",
            margin:          "auto",
            position:        "relative",
            width:           this.state.width,
        };
        const buttonStyle: React.CSSProperties = {
            bottom:   "0",
            fontSize: "12px",
            position: "absolute",
            right:    "0",
        };
        return (
            <div id="timetable-view">
                {/* Tippy css */} <link rel="stylesheet" href="https://cdn.rawgit.com/tvkhoa/react-tippy/master/dist/tippy.css"/>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <div style={divStyle}>
                        <ReactGridLayout
                            cols={((TimePeriod.Max.Hour - TimePeriod.Min.Hour)) * 2 + 2}
                            maxRows={50}
                            rowHeight={50}
                            width={this.state.width}
                            layout={skeleton.Layouts}
                            margin={[0, 0]}
                            isDraggable={false}
                            isResizable={false}
                            autoSize={true}
                            verticalCompact={false}>
                            {skeleton.Children}
                        </ReactGridLayout>
                        {this.props.slots ?
                        <Button id="summary-btn" raised={true} style={buttonStyle} onClick={this.props.handleToggleIsOpenOfSummary}>
                            {this.props.isSummaryOpen ? "hide summary" : "show summary"}
                        </Button>
                        : null}
                    </div>
                    <div style={{display: this.props.isSummaryOpen ? "inline" : "none"}}>
                        <TimetableSummaryView slots={this.props.slots}/>
                    </div>
                </StackPanel>
            </div>
        );
    }

    public handleWindowResizing = () => {
        this.setState({width: getTimetableViewWidth()});
    }
}

export const GetStandardDayColumnLayout = () : ReactGridLayout.Layout[] => {
    const result = Array < ReactGridLayout.Layout > ();
    const NUMBER_OF_DAY_PER_WEEK = 7;
    for (let j = 0; j <= NUMBER_OF_DAY_PER_WEEK; j++) {
        result.push({
            h: 1,
            i: ("d" + j),
            w: 2,
            x: 0,
            y: j
        });
    }
    return result;
};

export const GenerateHorizontalDividers = (skeleton: ISkeleton) : ISkeleton => {
    const getDivider = (layoutId: string) => {
        const dividerStyle : React.CSSProperties = {
            borderBottom: "1px dotted #666",
            width: "100%"
        };
        return (
            <div key={layoutId} style={dividerStyle}/>
        );
    };
    const dividers: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
        dividers.push(getDivider("divider" + i));
    }
    const dividersLayouts : ReactGridLayout.Layout[] = [];
    for (let i = 1; i <= 6; i++) {
        dividersLayouts.push({
            ...skeleton.Layouts.filter((x) => x.i === "d" + i)[0],
            i: ( "divider" + i ),
            w: ( TimePeriod.Max.Hour - TimePeriod.Min.Hour ) * 2,
            x: 2,
        });
    }
    return {
        Children: dividers,
        Layouts: dividersLayouts
    };
};

/*
Note: For the horizontal borders to work, the synchronizeLayoutWithChildren function of ReactGirdLayout must be disabled,
It can be disabled by returning the initialLayout directly
in utils.js of ReactGridLayout folder
*/
