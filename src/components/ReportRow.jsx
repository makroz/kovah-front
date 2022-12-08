import { getDateStr } from "../utils/date";
const ReportRow = ({ report }) => {
  return (
    <tr>
      <td>{report.title}</td>
      <td>
        <div>{getDateStr(report.created_at)}</div>
      </td>
      <td>
        {report.report_link ? (
          <a href={report.report_link} target="_blank">
            Descargar&nbsp;&nbsp;
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8333 5.5H8.5V0.5H3.5V5.5H0.166666L6 11.3333L11.8333 5.5ZM5.16667 7.16667V2.16667H6.83333V7.16667H7.80833L6 8.975L4.19167 7.16667H5.16667ZM0.166666 13H11.8333V14.6667H0.166666V13Z"
                fill="white"
              />
            </svg>
          </a>
        ) : (
          <span>wait for Upload..</span>
        )}
      </td>
    </tr>
  );
};

export default ReportRow;
