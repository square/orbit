<template>
	<div>
		<o-heading>Repositioning popover content on click</o-heading>
		<p>
			Make sure popover stays open after clicking the item inside.
		</p>
		<p v-if="clicked">
			Template rerendered, popover positioning moved down.
		</p>

		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button
					@click="popover.toggle()"
				>
					Open Popover
				</o-button>
			</template>

			<o-nav
				variant="menu"
				theme="light"
			>
				<o-nav-link @mousedown="clicked = !clicked">
					Click to toggle content above.
				</o-nav-link>
			</o-nav>
		</o-popover>

		<div>
			<o-heading>Programatically opening</o-heading>
			<p>
				Programmatically open popover on a click on a button outside of
				popover action scope. Click the non-orbit button, make sure the popover
				opens.
			</p>
			<button @click="openPopoverRef">
				Open popover
			</button>
			<o-popover ref="pop">
				<template
					slot="action"
					slot-scope="popover"
				>
					<o-button @click="popover.toggle()">
						Open Popover
					</o-button>
				</template>

				Hello World
			</o-popover>
		</div>

		<div>
			<o-heading>Checkboxes</o-heading>
			<p>
				Click checkboxes within a popover, make sure clicking the checkbox
				doesn't close the popover.
			</p>
			<o-popover>
				<template
					slot="action"
					slot-scope="popover"
				>
					<o-button @click="popover.toggle()">
						Popover with close button
					</o-button>
				</template>

				<template slot-scope="popover">
					<o-checkbox v-model="engineer">
						Shuttle Project Engineer
						(v-model)
					</o-checkbox>

					<o-checkbox
						:checked="director"
						@checkbox:update="val => { director = val }"
					>
						Landing and Recovery Director
						(Without v-model)
					</o-checkbox>

					<o-checkbox
						v-model="commander"
						true-value="ready"
						false-value="not-ready"
					>
						Mission Commander
						(Custom checked and unchecked values)
					</o-checkbox>

					<o-checkbox
						v-model="conductor"
						disabled
					>
						Payload Test Conductor
						(Disabled)
					</o-checkbox>
					Click outside to close. Or click the following button:<br><br>
					<o-button
						variant="primary"
						@click="popover.close()"
					>
						Close
					</o-button>
				</template>
			</o-popover>
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ONav, ONavLink } from '@square/orbit/components/Nav';
import { OPopover } from '@square/orbit/components/Popover';
import { OHeading } from '@square/orbit/components/Heading';
import { OCheckbox } from '@square/orbit/components/Checkbox';

export default {
	components: {
		OButton,
		ONav,
		ONavLink,
		OPopover,
		OHeading,
		OCheckbox,
	},

	data() {
		return {
			clicked: false,
			conductor: null,
			engineer: null,
			director: null,
			commander: null,
		};
	},
	methods: {
		openPopoverRef() {
			this.$refs.pop.actionAPI.open();
		},
	},
};
</script>
