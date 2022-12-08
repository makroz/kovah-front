import useAxios from "../hooks/useAxios";
import style from "../css/listreport.module.css";
import ReportRow from "./ReportRow";
const ListReport = () => {
  const { data, error, loaded } = useAxios("/list-reports", "GET", {}, false);
  if (error)
    return (
      <div className={style.list}>An Error Network occured... try again...</div>
    );

  if (!loaded) return <div className={style.list}> Loading ... </div>;

  return (
    <div className={style.list}>
      <table>
        <thead>
          <tr>
            <th className={style.left}>Titulo</th>
            <th className={style.center}>Fecha de creación</th>
            <th className={style.right}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 && (
            <tr>
              <td colSpan="3">
                <br />
                <br />
                <br />
                <div className={style.center}>Empty data</div>
              </td>
            </tr>
          )}
          {loaded &&
            data.map((report) => {
              return <ReportRow report={report} key={report.id} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListReport;
