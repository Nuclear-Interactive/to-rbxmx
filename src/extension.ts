import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "to-rbxmx" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('to-rbxmx.helloWorld', () => {
		// vscode.window.showInformationMessage('Hello World from to-rbxmx!');
		
		const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.document && activeEditor.document.fileName) {
			if (activeEditor.document.languageId === "lua" || activeEditor.document.languageId === "luau") {
				const WorkspaceEditor = new vscode.WorkspaceEdit();
				const WorkspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

				const FileOutputPath = vscode.Uri.file(WorkspacePath + "/output.rbxmx");
				WorkspaceEditor.createFile(FileOutputPath, {overwrite: true});
				WorkspaceEditor.replace(FileOutputPath, new vscode.Range(0, 0, 0, 0), `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<Meta name="ExplicitAutoJoints">true</Meta>
	<External>null</External>
	<External>nil</External>
	<Item class="Script" referent="RBX0916F1CA21A4446EAE04AF95A32A7382">
		<Properties>
			<BinaryString name="AttributesSerialize"></BinaryString>
			<bool name="Disabled">false</bool>
			<Content name="LinkedSource"><null></null></Content>
			<string name="Name">output</string>
			<token name="RunContext">0</token>
			<string name="ScriptGuid">{C14F608A-1738-4569-A6B2-C860C642157F}</string>
			<ProtectedString name="Source"><![CDATA[` + activeEditor.document.getText() + `]]></ProtectedString>
			<int64 name="SourceAssetId">-1</int64>
			<BinaryString name="Tags"></BinaryString>
		</Properties>
	</Item>
</roblox>
`)
				
				vscode.workspace.applyEdit(WorkspaceEditor);
				vscode.window.showInformationMessage("Created file " + "output.rbxmx");
			} else {
				vscode.window.showErrorMessage("Selected file isn't .LUA or .LUAU");
			}
		} else {
			vscode.window.showErrorMessage("Please select a .LUA or .LUAU file!")
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log("bye bye!");
}
