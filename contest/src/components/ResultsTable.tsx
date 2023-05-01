import {Divider, Row, Table} from "antd";
import React from "react";

class ResultsTable extends React.Component<{ data: any, columns: any }> {
    render() {
        let {data, columns} = this.props;
        if (data) {
            return (
                <div>
                    <Divider plain><h3>Results</h3></Divider>
                    <div style={{textAlign: 'center'}}>
                        <p>
                           <b>Draw number:</b>  {data.idx}
                        </p>
                        <p>
                            <b>Draw datetime:</b> {data.drawDate}
                        </p>
                    </div>

                    <div>
                        <Table dataSource={data.winnersList} columns={columns} pagination={false} rowKey='email'/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default ResultsTable;