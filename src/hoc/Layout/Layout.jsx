import React, { Component } from "react"
import classes from "./Layout.module.css"
import { MenuToggle } from "../../components/Navigation"
import { Drawer } from "../../components/Navigation"
import { connect } from "react-redux"

class Layout extends Component {
	state = {
		menu: false,
	}

	toggleMenyHandler = () => {
		this.setState({
			menu: !this.state.menu,
		})
	}

	menuCloseHandler = () => {
		this.setState({
			menu: false,
		})
	}

	render() {
		return (
			<div>
				<Drawer
					isOpen={this.state.menu}
					onClose={this.menuCloseHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<MenuToggle
					onToggle={this.toggleMenyHandler}
					isOpen={this.state.menu}
				/>

				<main className={classes.Layout}>{this.props.children}</main>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token,
	}
}

export default connect(mapStateToProps)(Layout)
