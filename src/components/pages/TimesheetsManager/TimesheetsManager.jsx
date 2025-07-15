import { useEffect, useState } from 'react';

import avatarImg from "../../../assets/avatar.png";
import './TimesheetsManager.scss';

export const TimesheetsManager = () => {
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 7));
    const [validations, setValidations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchValidations = async () => {
        const [year, month] = selectedDate.split('-');
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/calendar/admin/validations/${year}/${month}`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const json = await res.json();
            setValidations(json.data || []);
        } catch (err) {
            setError('Error loading validations');
            setValidations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchValidations();
    }, [selectedDate]);

    const handleChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSignOne = (employeeId) => {
        console.log(`Firmar individualmente: empleado ${employeeId}`);
    };

    const handleSignAll = () => {
        console.log('Firmar todos los registros pendientes del mes actual');
    };

    const hasPendingValidations = validations.some(v => !v.isSignedBySupervisor);

    const sortedValidations = [...validations].sort((a, b) =>
        (a.Employee?.name || '').localeCompare(b.Employee?.name || '')
    );

    return (
        <div className="timesheetsManager">
            <section className="timesheetsHeader">
                <h2>Monthly Timesheet Signatures</h2>
                <input
                    type="month"
                    value={selectedDate}
                    onChange={handleChange}
                    max={new Date().toISOString().slice(0, 7)}
                />
            </section>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && sortedValidations.length === 0 && (
                <p>No employees have signed the timesheet this month.</p>
            )}

            <div className="validationsList">
                {sortedValidations.map((v) => {
                    const employee = v.Employee || {};
                    const signedEmployee = v.signedAtEmployee
                        ? new Date(v.signedAtEmployee).toLocaleDateString()
                        : '—';
                    const signedSupervisor = v.signedAtSupervisor
                        ? new Date(v.signedAtSupervisor).toLocaleDateString()
                        : null;

                    return (
                        <div className="validationRow" key={employee.id}>
                            <div className="userInfo">
                                <img
                                    src={avatarImg}
                                    alt="avatar"
                                    className="avatar"
                                />
                                <div className="nameBlock">
                                    <strong>{employee.name} {employee.surname}</strong>
                                    <span className="signedAt">Employee signed: {signedEmployee}</span>
                                </div>
                            </div>

                            <div className={`statusBlock ${v.isSignedBySupervisor ? 'signed' : 'pending'}`}>
                                <div className="statusText">
                                    {v.isSignedBySupervisor ? 'Signed by Supervisor: ' : 'Signed by Supervisor: Not signed'}
                                </div>
                                {signedSupervisor && (
                                    <div className="signedAt">{signedSupervisor}</div>
                                )}
                            </div>

                            <button
                                className="signButton"
                                onClick={() => handleSignOne(employee.id)}
                                disabled={v.isSignedBySupervisor}
                            >
                                Sign
                            </button>
                        </div>
                    );
                })}
            </div>

            {hasPendingValidations && (
                <div className="signAllWrapper">
                    <button className="signAllButton" onClick={handleSignAll}>
                        Sign All Pending
                    </button>
                </div>
            )}
        </div>
    );
};


