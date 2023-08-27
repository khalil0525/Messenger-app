import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Access from "./Access.js";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import ChangePassword from "./pages/ChangePassword.js";
import EmailVerification from "./pages/EmailVerification.js";
import RecoverPassword from "./pages/RecoverPassword.js";
import { SnackBarMessage, Home } from "./components";
import { SocketContext, socket } from "./context/socket";
import Verify from "./pages/Verify.js";
import Profile from "./components/Profile.js";
import Account from "./components/Account.js";

const Routes = (props) => {
	const [user, setUser] = useState({
		isFetching: true,
	});

	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [snackBarOpen, setSnackBarOpen] = useState(false);

	const login = async (credentials) => {
		try {
			const { data } = await axios.post("/auth/login", credentials);
			await localStorage.setItem("messenger-token", data.token);
			setUser(data);
			socket.emit("go-online", data.id);
		} catch (error) {
			console.error(error);
			setUser({ error: error.response.data.error || "Server Error" });
			setMessage(error.response.data.error);
			setIsError(true);
			setSnackBarOpen(true);
		}
	};

	const register = async (credentials) => {
		try {
			const { data } = await axios.post("/auth/register", credentials);

			await localStorage.setItem("messenger-token", data.token);
			setUser(data);
			socket.emit("go-online", data.id);
		} catch (error) {
			console.error(error);
			setUser({ error: error.response.data.error || "Server Error" });
			setMessage(error.response.data.error);
			setIsError(true);
			setSnackBarOpen(true);
		}
	};

	const recoverPassword = async (email) => {
		try {
			await axios.post("/auth/password/recover", {
				email,
			});

			setMessage("Recovery email sent!");

			setIsError(false);
			setSnackBarOpen(true);
		} catch (error) {
			console.error(error);
			setMessage(error.response.data.error);
			setIsError(true);
			setSnackBarOpen(true);
		}
	};

	const recoveryChangePassword = async (token, password) => {
		try {
			await axios.post(`/auth/password/set/${token}`, {
				newPassword: password,
			});
			setMessage("Password changed successfully");
			setIsError(false);
			setSnackBarOpen(true);
		} catch (error) {
			console.error(error);
			setMessage(error.response.data.error);
			setIsError(true);
			setSnackBarOpen(true);
		}
	};

	const resendVerification = async (user) => {
		try {
			const { data } = await axios.post(`/auth/verify/resend`, { user });
			console.log(data);
			setMessage("Verification resent!");
			setIsError(false);
			setSnackBarOpen(true);
		} catch (error) {
			console.error(error);
			setMessage(error.response.data.error);
			setIsError(true);
			setSnackBarOpen(true);
		}
	};

	const checkVerification = async (token) => {
		try {
			const { data } = await axios.get(`/auth/verify?token=${token}`);
			await localStorage.setItem("messenger-token", data.token);
			setUser(data);
			setMessage("Email verified successfully!");
			setIsError(false);
			setSnackBarOpen(true);
		} catch (error) {
			console.error(error);
			setMessage("Email verification failed. Please try again.");
			setIsError(true);
			setSnackBarOpen(true);
		}
	};
	const logout = async (id) => {
		try {
			await axios.delete("/auth/logout");
			await localStorage.removeItem("messenger-token");
			setUser({});
			setMessage("Succesfully logged out");
			setIsError(false);
			setSnackBarOpen(true);
			socket.emit("logout", id);
		} catch (error) {
			console.error(error);
			setMessage(error.response.data.error);
			setIsError(true);
			setSnackBarOpen(true);
		}
	};

	// Lifecycle

	useEffect(() => {
		const fetchUser = async () => {
			setUser((prev) => ({ ...prev, isFetching: true }));
			try {
				const { data } = await axios.get("/auth/user");
				setUser(data);
				if (data.id) {
					socket.emit("go-online", data.id);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setUser((prev) => ({ ...prev, isFetching: false }));
			}
		};

		fetchUser();
	}, []);

	useEffect(() => {
		if (user?.error) {
			// check to make sure error is what we expect, in case we get an unexpected server error object
			if (typeof user.error === "string") {
				setMessage(user.error);
			} else {
				setMessage("Internal Server Error. Please try again");
			}
			setIsError(true);
			setSnackBarOpen(true);
		}
	}, [user?.error]);

	if (user?.isFetching) {
		return <div>Loading...</div>;
	}
	console.log(user);
	return (
		<SocketContext.Provider value={socket}>
			{snackBarOpen && (
				<SnackBarMessage // Updated component name
					setSnackBarOpen={setSnackBarOpen}
					message={message}
					snackBarOpen={snackBarOpen}
					isError={isError} // Set this based on whether it's an error message
				/>
			)}

			<Switch>
				<Route
					path="/login"
					render={() => (
						<Access WrappedComponent={<Login user={user} login={login} />} />
					)}
				/>

				<Route
					path="/register"
					render={() => (
						<Access
							WrappedComponent={<Signup user={user} register={register} />}
						/>
					)}
				/>
				<Route
					path="/verify"
					render={() =>
						user && user?.id && !user?.active ? (
							<Verify checkVerification={checkVerification} />
						) : (
							<Redirect to="/" />
						)
					}
				/>

				<Route
					path="/password-recovery"
					render={() =>
						user?.id && user?.active ? (
							<Redirect to="/home" />
						) : (
							<Access
								WrappedComponent={
									<RecoverPassword recoverPassword={recoverPassword} />
								}
							/>
						)
					}
				/>
				<Route
					path="/change-password"
					render={() => (
						<ChangePassword recoveryChangePassword={recoveryChangePassword} />
					)}
				/>
				<Route
					exact
					path="/"
					render={(props) =>
						user?.id ? (
							user?.active ? (
								<Home user={user} logout={logout} />
							) : (
								<Access
									WrappedComponent={
										<EmailVerification
											user={user}
											resendVerification={resendVerification}
										/>
									}
								/>
							)
						) : (
							<Access WrappedComponent={<Login user={user} login={login} />} />
						)
					}
				/>
				<Route
					path="/home"
					render={() => <Home user={user} logout={logout} />}
				/>
				<Route
					path="/profile"
					render={() => <Profile user={user} setUser={setUser} />}
				/>
				<Route
					path="/account"
					render={() => <Account user={user} setUser={setUser} />}
				/>
			</Switch>
		</SocketContext.Provider>
	);
};

export default withRouter(Routes);
